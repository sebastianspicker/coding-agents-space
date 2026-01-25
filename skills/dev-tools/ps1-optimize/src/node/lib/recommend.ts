import fs from "node:fs";
import { Finding, ProjectContext } from "../types.js";
import { LIMITS } from "./limits.js";

type Focus = "security" | "compat" | "perf" | "style";

export async function runRecommend(
  ctx: ProjectContext,
  focus: Focus[],
  logs: string[]
): Promise<{ findings: Finding[] }> {
  const findings: Finding[] = [];
  const files = ctx.sourceFilePaths.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  if (focus.includes("security")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Security: avoid Invoke-Expression; prefer call operator with validated arguments.",
      ruleId: "security-no-invoke-expression",
      confidence: 0.6
    });
  }

  if (focus.includes("compat")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Compat: avoid Get-WmiObject in new scripts; prefer Get-CimInstance.",
      ruleId: "compat-get-ciminstance",
      confidence: 0.6
    });
  }

  if (focus.includes("perf")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Perf: prefer ForEach-Object -Parallel only for IO-heavy work; avoid excessive pipeline overhead in hot loops.",
      ruleId: "perf-pipeline-overhead",
      confidence: 0.55
    });
  }

  if (focus.includes("style")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Style: prefer Write-Verbose/Write-Information over Write-Host for structured output.",
      ruleId: "style-write-verbose",
      confidence: 0.55
    });
  }

  let scanned = 0;
  for (const p of files) {
    if (scanned >= 30) break;
    let text: string;
    try {
      text = fs.readFileSync(p, "utf8");
    } catch {
      continue;
    }

    if (focus.includes("security") && text.includes("Invoke-Expression")) {
      findings.push({
        kind: "recommendation",
        severity: "warn",
        message: "Security: Invoke-Expression detected; review for injection risks.",
        file: p,
        ruleId: "security-invoke-expression",
        confidence: 0.6
      });
    }
    if (focus.includes("compat") && text.includes("Get-WmiObject")) {
      findings.push({
        kind: "recommendation",
        severity: "info",
        message: "Compat: Get-WmiObject detected; consider migrating to Get-CimInstance.",
        file: p,
        ruleId: "compat-get-wmiobject",
        confidence: 0.55
      });
    }

    scanned += 1;
    if (findings.length >= LIMITS.MAX_FINDINGS_PER_CATEGORY) break;
  }

  if (findings.length > LIMITS.MAX_FINDINGS_PER_CATEGORY) {
    logs.push("Recommend: findings truncated due to max limit.");
    findings.length = LIMITS.MAX_FINDINGS_PER_CATEGORY;
  }

  return { findings };
}
