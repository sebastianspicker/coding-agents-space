import crypto from "node:crypto";
import ts from "typescript";
import { Node, SourceFile } from "ts-morph";
import { ProjectContext, Finding, DedupeOptions, Targets } from "../types.js";
import { tokenizeNormalized } from "./rules/tokenize.js";
import { LIMITS } from "./limits.js";
import { rangeFromPos } from "./heuristics.js";
import { shouldAnalyzeFile } from "./targets.js";

type Candidate = {
  file: string;
  range: { start: number; length: number };
  tokens: number;
  hash: string;
};

function hashTokens(tokens: string[]): string {
  return crypto.createHash("sha256").update(tokens.join(" ")).digest("hex");
}

function isFunctionLike(n: Node): boolean {
  const k = n.getKind();
  return (
    k === ts.SyntaxKind.FunctionDeclaration ||
    k === ts.SyntaxKind.FunctionExpression ||
    k === ts.SyntaxKind.ArrowFunction ||
    k === ts.SyntaxKind.MethodDeclaration
  );
}

function extractCandidates(sf: SourceFile, minTokens: number, maxCandidates: number): Candidate[] {
  const candidates: Candidate[] = [];

  // Best practice: linear scan with early exits; avoid expensive "getDescendantsOfKind" on huge files.
  sf.forEachDescendant((n) => {
    if (candidates.length >= maxCandidates) return;

    if (!isFunctionLike(n)) return;

    const text = n.getText();
    const tokens = tokenizeNormalized(text);
    if (tokens.length < minTokens) return;
    if (tokens.length > LIMITS.MAX_TOKENS_PER_CANDIDATE) return;

    const start = n.getStart();
    const length = Math.max(1, n.getWidth());
    candidates.push({
      file: sf.getFilePath(),
      range: { start, length },
      tokens: tokens.length,
      hash: hashTokens(tokens)
    });
  });

  return candidates;
}

function extractCandidatesAstShape(sf: SourceFile, minTokens: number, maxCandidates: number): Candidate[] {
  const candidates: Candidate[] = [];

  sf.forEachDescendant((n) => {
    if (candidates.length >= maxCandidates) return;
    if (!isFunctionLike(n)) return;

    const tokens: string[] = [];
    n.forEachDescendant((d) => {
      if (tokens.length >= LIMITS.MAX_TOKENS_PER_CANDIDATE) return;
      tokens.push(String(d.getKind()));
    });

    if (tokens.length < minTokens) return;

    const start = n.getStart();
    const length = Math.max(1, n.getWidth());
    candidates.push({
      file: sf.getFilePath(),
      range: { start, length },
      tokens: tokens.length,
      hash: hashTokens(tokens)
    });
  });

  return candidates;
}

export async function runDedupe(
  ctx: ProjectContext,
  options: DedupeOptions,
  logs: string[],
  targets?: Targets
): Promise<{ findings: Finding[]; metrics: { duplicationCandidates: number } }> {
  const findings: Finding[] = [];
  const minTokens = Math.max(20, Math.min(400, options.minTokens ?? 60));
  const maxCandidates = Math.max(50, Math.min(5000, options.maxCandidates ?? LIMITS.MAX_DEDUPE_CANDIDATES_DEFAULT));
  const strategy = options.strategy ?? "token-hash";

  const files = ctx.project.getSourceFiles().filter((sf) => shouldAnalyzeFile(sf.getFilePath(), ctx.rootAbs, targets));
  const sliced = files.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  logs.push(
    `Dedupe: scanning ${sliced.length} files (max ${LIMITS.MAX_FILES_HEURISTICS}), minTokens=${minTokens}, maxCandidates=${maxCandidates}, strategy=${strategy}`
  );

  const all: Candidate[] = [];
  for (const sf of sliced) {
    const perFile = Math.floor(maxCandidates / Math.max(1, sliced.length)) + 1;
    if (strategy === "ast-shape") {
      all.push(...extractCandidatesAstShape(sf, minTokens, perFile));
    } else {
      all.push(...extractCandidates(sf, minTokens, perFile));
    }
    if (all.length >= maxCandidates) break;
  }

  const groups = new Map<string, Candidate[]>();
  for (const c of all) {
    const g = groups.get(c.hash) ?? [];
    g.push(c);
    groups.set(c.hash, g);
  }

  let dupGroups = 0;
  for (const [hash, arr] of groups) {
    if (arr.length < 2) continue;
    dupGroups += 1;

    const locations = arr
      .slice(0, 6)
      .map((c) => `${c.file}:${c.range.start}`)
      .join(", ");

    findings.push({
      kind: "dedupe",
      severity: "info",
      message: `Possible duplicate code: ${arr.length} similar blocks (${strategy}). Locations: ${locations}`,
      ruleId: `dedupe-${strategy}`,
      confidence: 0.6
    });

    // Also emit a finding per block with a range for easy navigation (limited)
    for (const c of arr.slice(0, 10)) {
      const sf = ctx.project.getSourceFile(c.file);
      if (!sf) continue;
      findings.push({
        kind: "dedupe",
        severity: "info",
        message: "Duplicate candidate block (see group summary).",
        file: c.file,
        range: rangeFromPos(sf, c.range.start, c.range.length),
        ruleId: "dedupe-block",
        confidence: 0.55
      });
    }

    if (findings.length >= LIMITS.MAX_FINDINGS_PER_CATEGORY) break;
  }

  return {
    findings,
    metrics: { duplicationCandidates: dupGroups }
  };
}
