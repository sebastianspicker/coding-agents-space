import fs from "node:fs";
import { ProjectContext, Finding, Patch, RefactorGoal, Targets } from "../types.js";
import { applyEdits, findEditConflicts } from "./edits.js";
import { unifiedDiff } from "./diff.js";
import { LIMITS } from "./limits.js";
import { shouldAnalyzeFile } from "./targets.js";
import { computeWhitespaceEdits } from "./rules/whitespace.js";

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

  const wantWhitespace = goals.includes("format-whitespace");
  const files = ctx.sourceFilePaths.filter((p) => shouldAnalyzeFile(p, ctx.rootAbs, targets));
  const sliced = files.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  if (!wantWhitespace) {
    findings.push({
      kind: "refactor",
      severity: "info",
      message: "No supported refactor goals provided (format-whitespace only).",
      ruleId: "refactor-noop",
      confidence: 1.0
    });
    return { findings, patches, filesModified };
  }

  logs.push(`Refactor: format-whitespace on ${sliced.length} files (${applyFixes ? "apply+patch" : "patch-only"}).`);

  for (const p of sliced) {
    if (patches.length >= LIMITS.MAX_PATCHES) {
      logs.push("Refactor: patch limit reached; stopping further patch generation.");
      break;
    }

    let oldText: string;
    try {
      oldText = fs.readFileSync(p, "utf8");
    } catch {
      continue;
    }

    const { edits } = computeWhitespaceEdits(p, oldText, {
      trimTrailingWhitespace: true,
      ensureFinalNewline: true
    });

    if (!edits.length) continue;

    const conflicts = findEditConflicts(edits);
    if (conflicts.length) {
      logs.push(`Refactor: conflicting edits in ${p}; skipping.`);
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
        logs.push(`Refactor: failed to write ${p}`);
      }
    }

    findings.push({
      kind: "refactor",
      severity: "info",
      message: "format-whitespace: trimmed trailing whitespace and ensured final newline.",
      file: p,
      ruleId: "format-whitespace",
      confidence: 0.8,
      suggestedFix: { title: "Apply format-whitespace patch", patch }
    });
  }

  return { findings, patches, filesModified };
}
