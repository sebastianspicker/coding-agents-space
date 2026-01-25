import fs from "node:fs";
import { ProjectContext, Finding, Patch, RefactorGoal, Targets } from "../types.js";
import { unifiedDiff } from "./diff.js";
import { preferConstEdits } from "./rules/preferConst.js";
import { LIMITS } from "./limits.js";
import { applyEdits } from "./edits.js";
import { shouldAnalyzeFile } from "./targets.js";

export async function runRefactor(
  ctx: ProjectContext,
  goals: RefactorGoal[],
  applyFixes: boolean,
  logs: string[],
  targets?: Targets
): Promise<{ findings: Finding[]; patches: Patch[]; filesModified: number }> {
  const findings: Finding[] = [];
  const patches: Patch[] = [];
  let filesModified = 0;

  const files = ctx.project.getSourceFiles().filter((sf) => shouldAnalyzeFile(sf.getFilePath(), ctx.rootAbs, targets));
  const sliced = files.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  const wantPreferConst = goals.includes("prefer-const");

  if (wantPreferConst) {
    logs.push(
      `Refactor: prefer-const on ${sliced.length} files (${applyFixes ? "apply+patch" : "patch-only"}).`
    );

    for (const sf of sliced) {
      const p = sf.getFilePath();
      let oldText: string;
      try {
        oldText = fs.readFileSync(p, "utf8");
      } catch {
        continue;
      }

      const { edits, changedStatements } = preferConstEdits(p, oldText);
      if (!edits.length) continue;

      const newText = applyEdits(oldText, edits);
      const patch = unifiedDiff(p, oldText, newText);

      patches.push({ path: p, patch });
      if (applyFixes) {
        try {
          fs.writeFileSync(p, newText, "utf8");
          filesModified += 1;
        } catch {
          logs.push(`Refactor: failed to write ${p}`);
        }
      }

      findings.push({
        kind: "refactor",
        severity: "info",
        message: `prefer-const: ${changedStatements} variable statement(s) can be 'const'. ${applyFixes ? "Applied with patch emitted." : "Patch emitted (not applied)."}`,
        file: p,
        ruleId: "prefer-const",
        confidence: 0.85,
        suggestedFix: { title: "Apply prefer-const patch", patch }
      });

      if (patches.length >= 120) {
        logs.push("Refactor: patch limit reached; stopping further patch generation.");
        break;
      }
    }
  }

  // Other goals (v0.2): emitted as recommendations (no auto changes)
  for (const g of goals) {
    if (g === "prefer-const") continue;
    findings.push({
      kind: "refactor",
      severity: "info",
      message: `Goal '${g}' is supported as recommendation-only in v0.2 (no automatic rewrite).`,
      ruleId: `refactor-${g}`,
      confidence: 0.7
    });
  }

  return { findings, patches, filesModified };
}
