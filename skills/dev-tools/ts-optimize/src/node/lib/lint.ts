import fs from "node:fs";
import { Finding, Patch, ProjectContext, Targets, LintRule } from "../types.js";
import { preferConstEdits } from "./rules/preferConst.js";
import { findNoVarFindings } from "./rules/noVar.js";
import { applyEdits, findEditConflicts, TextEdit } from "./edits.js";
import { unifiedDiff } from "./diff.js";
import { LIMITS } from "./limits.js";
import { shouldAnalyzeFile } from "./targets.js";

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

  const lintRules: LintRule[] = rules?.length ? rules : ["prefer-const", "no-var"];
  const files = ctx.project.getSourceFiles().filter((sf) => shouldAnalyzeFile(sf.getFilePath(), ctx.rootAbs, targets));
  const sliced = files.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  logs.push(`Lint: running [${lintRules.join(", ")}] on ${sliced.length} files (${applyFixes ? "apply+patch" : "patch-only"}).`);

  for (const sf of sliced) {
    if (findings.length >= LIMITS.MAX_FINDINGS_PER_CATEGORY) {
      logs.push("Lint: findings truncated due to max limit.");
      break;
    }
    const p = sf.getFilePath();
    let oldText: string;
    try {
      oldText = fs.readFileSync(p, "utf8");
    } catch {
      continue;
    }

    const edits: TextEdit[] = [];
    if (lintRules.includes("prefer-const")) {
      const { edits: prefEdits, changedStatements } = preferConstEdits(p, oldText);
      if (prefEdits.length) {
        findings.push({
          kind: "lint",
          severity: "info",
          message: `prefer-const: ${changedStatements} variable statement(s) can be 'const'.`,
          file: p,
          ruleId: "prefer-const",
          confidence: 0.85
        });
        edits.push(...prefEdits);
      }
    }

    if (lintRules.includes("no-var")) {
      findings.push(...findNoVarFindings(p, oldText));
    }

    if (findings.length > LIMITS.MAX_FINDINGS_PER_CATEGORY) {
      logs.push("Lint: findings truncated due to max limit.");
      findings.length = LIMITS.MAX_FINDINGS_PER_CATEGORY;
      break;
    }

    if (!edits.length) continue;

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
