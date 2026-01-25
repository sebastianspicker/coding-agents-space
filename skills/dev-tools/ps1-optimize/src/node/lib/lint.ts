import fs from "node:fs";
import { Finding, Patch, ProjectContext, Targets, LintRule } from "../types.js";
import { applyEdits, findEditConflicts, TextEdit } from "./edits.js";
import { unifiedDiff } from "./diff.js";
import { LIMITS } from "./limits.js";
import { shouldAnalyzeFile } from "./targets.js";
import { computeWhitespaceEdits } from "./rules/whitespace.js";
import { rangeFromIndex } from "./range.js";

const NO_WRITE_HOST_REGEX = /(?<![A-Za-z0-9_-])Write-Host(?![A-Za-z0-9_-])/g;

function findNoWriteHost(filePath: string, sourceText: string): Finding[] {
  const findings: Finding[] = [];
  let match: RegExpExecArray | null;
  while ((match = NO_WRITE_HOST_REGEX.exec(sourceText)) !== null) {
    findings.push({
      kind: "lint",
      severity: "warn",
      message: "Avoid Write-Host in production scripts; prefer Write-Output or Write-Verbose.",
      file: filePath,
      range: rangeFromIndex(sourceText, match.index, match[0].length),
      ruleId: "no-write-host",
      confidence: 0.6
    });
  }
  return findings;
}

export async function runLint(
  ctx: ProjectContext,
  rules: LintRule[] | undefined,
  applyFixes: boolean,
  logs: string[],
  targets?: Targets
): Promise<{ findings: Finding[]; patches: Patch[]; filesModified: number }> {
  const findings: Finding[] = [];
  const patches: Patch[] = [];
  let filesModified = 0;

  const lintRules: LintRule[] = rules?.length ? rules : ["trim-trailing-whitespace", "final-newline", "no-write-host"];
  const files = ctx.sourceFilePaths.filter((p) => shouldAnalyzeFile(p, ctx.rootAbs, targets));
  const sliced = files.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  logs.push(`Lint: running [${lintRules.join(", ")}] on ${sliced.length} files (${applyFixes ? "apply+patch" : "patch-only"}).`);

  for (const p of sliced) {
    if (findings.length >= LIMITS.MAX_FINDINGS_PER_CATEGORY) {
      logs.push("Lint: findings truncated due to max limit.");
      break;
    }

    let oldText: string;
    try {
      oldText = fs.readFileSync(p, "utf8");
    } catch {
      continue;
    }

    const edits: TextEdit[] = [];
    if (lintRules.includes("trim-trailing-whitespace") || lintRules.includes("final-newline")) {
      const { edits: wsEdits, findings: wsFindings } = computeWhitespaceEdits(p, oldText, {
        trimTrailingWhitespace: lintRules.includes("trim-trailing-whitespace"),
        ensureFinalNewline: lintRules.includes("final-newline")
      });
      edits.push(...wsEdits);
      findings.push(...wsFindings);
    }

    if (lintRules.includes("no-write-host")) {
      findings.push(...findNoWriteHost(p, oldText));
    }

    if (!edits.length) continue;
    if (patches.length >= LIMITS.MAX_PATCHES) {
      logs.push("Lint: patch limit reached; stopping further patch generation.");
      break;
    }

    const conflicts = findEditConflicts(edits);
    if (conflicts.length) {
      logs.push(`Lint: conflicting edits in ${p}; skipping auto-fix for this file.`);
      continue;
    }

    const newText = applyEdits(oldText, edits);
    if (newText === oldText) continue;

    const patch = unifiedDiff(p, oldText, newText);
    patches.push({ path: p, patch });

    if (applyFixes) {
      try {
        fs.writeFileSync(p, newText, "utf8");
        filesModified += 1;
      } catch {
        logs.push(`Lint: failed to write ${p}`);
      }
    }
  }

  return { findings, patches, filesModified };
}
