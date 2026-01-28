import ts from "typescript";
import { ProjectContext, Finding, DebugLevel, Targets } from "../types.js";
import { severityFromTsCategory, rangeFromPos, findAnyHotspots, findComplexityHotspots, findPerfHotspots } from "./heuristics.js";
import { LIMITS } from "./limits.js";
import { shouldAnalyzeFile } from "./targets.js";

function diagnosticMessageTextToString(messageText: unknown): string {
  if (typeof messageText === "string") return messageText;
  if (!messageText || typeof messageText !== "object") return String(messageText ?? "");

  const mt = messageText as { messageText?: unknown; next?: unknown };
  const head = typeof mt.messageText === "string" ? mt.messageText : "";
  const next = Array.isArray(mt.next) ? (mt.next as unknown[]) : [];
  if (!next.length) return head || "TypeScript diagnostic";

  const tail = next.map(diagnosticMessageTextToString).filter(Boolean);
  return [head, ...tail].filter(Boolean).join("\n");
}

export async function runDebug(
  ctx: ProjectContext,
  level: DebugLevel,
  logs: string[],
  targets?: Targets
): Promise<{ findings: Finding[]; metrics: { diagnostics: number; filesAnalyzed: number; estimatedComplexityHotspots: number } }> {
  const findings: Finding[] = [];
  const diags = ctx.project.getPreEmitDiagnostics();
  let diagCount = 0;

	  for (const d of diags) {
	    const sf = d.getSourceFile();
	    const filePath = sf?.getFilePath();
	    if (filePath && !shouldAnalyzeFile(filePath, ctx.rootAbs, targets)) continue;

	    diagCount += 1;
	    const cat = d.getCategory();
	    const severity = severityFromTsCategory(cat);
	    const message = diagnosticMessageTextToString(d.getMessageText());

	    if (sf && d.getStart() != null && d.getLength() != null) {
	      findings.push({
	        kind: "tsc",
	        severity,
	        message,
	        file: filePath,
	        range: rangeFromPos(sf, d.getStart()!, d.getLength()!),
	        ruleId: `TS${d.getCode()}`,
	        confidence: 1.0
	      });
	    } else {
	      findings.push({
	        kind: "tsc",
	        severity,
	        message,
	        ruleId: `TS${d.getCode()}`,
	        confidence: 1.0
	      });
	    }

    if (findings.length >= LIMITS.MAX_FINDINGS_PER_CATEGORY) break;
  }

  // Additional heuristic layers
  const sourceFiles = ctx.project.getSourceFiles().filter((sf) => shouldAnalyzeFile(sf.getFilePath(), ctx.rootAbs, targets));
  const sliced = sourceFiles.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  let complexityHotspots = 0;

  if (level === "medium" || level === "complex") {
    logs.push(`Debug(${level}): running any-hotspot + complexity heuristics on ${sliced.length} files (max ${LIMITS.MAX_FILES_HEURISTICS}).`);

    for (const sf of sliced) {
      findings.push(...findAnyHotspots(sf, Math.floor(LIMITS.MAX_FINDINGS_PER_CATEGORY / 2)));
      const thr = level === "complex" ? 12 : 16;
      const { findings: cfind, count } = findComplexityHotspots(sf, thr);
      complexityHotspots += count;
      findings.push(...cfind);

      if (findings.length >= LIMITS.MAX_FINDINGS_PER_CATEGORY * 2) break;
    }
  }

  if (level === "complex") {
    logs.push(`Debug(complex): running perf heuristics on ${sliced.length} files.`);
    for (const sf of sliced) {
      findings.push(...findPerfHotspots(sf, Math.floor(LIMITS.MAX_FINDINGS_PER_CATEGORY / 2)));
      if (findings.length >= LIMITS.MAX_FINDINGS_PER_CATEGORY * 3) break;
    }
  }

  return {
    findings,
    metrics: {
      diagnostics: diagCount,
      filesAnalyzed: sourceFiles.length,
      estimatedComplexityHotspots: complexityHotspots
    }
  };
}
