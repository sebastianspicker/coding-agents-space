import fs from "node:fs";
import { Finding, MigrateOptions, Patch, ProjectContext, Targets } from "../types.js";
import { applyEdits, findEditConflicts, TextEdit } from "./edits.js";
import { unifiedDiff } from "./diff.js";
import { LIMITS } from "./limits.js";
import { shouldAnalyzeFile } from "./targets.js";
import { rangeFromIndex } from "./range.js";

function buildCommandRegex(command: string): RegExp {
  const escaped = command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![A-Za-z0-9_-])${escaped}(?![A-Za-z0-9_-])`, "g");
}

export async function runMigrate(
  ctx: ProjectContext,
  options: MigrateOptions | undefined,
  applyFixes: boolean,
  logs: string[],
  targets?: Targets
): Promise<{ findings: Finding[]; patches: Patch[]; filesModified: number }> {
  const findings: Finding[] = [];
  const patches: Patch[] = [];
  let filesModified = 0;

  const renameCommands = options?.renameCommands ?? [];
  if (!renameCommands.length) {
    findings.push({
      kind: "migration",
      severity: "info",
      message: "Migration: no renameCommands rules provided; nothing to migrate.",
      ruleId: "migrate-no-rules",
      confidence: 1.0
    });
    return { findings, patches, filesModified };
  }

  const files = ctx.sourceFilePaths.filter((p) => shouldAnalyzeFile(p, ctx.rootAbs, targets));
  const sliced = files.slice(0, LIMITS.MAX_FILES_HEURISTICS);

  logs.push(`Migrate: applying ${renameCommands.length} renameCommands rule(s) on ${sliced.length} files.`);

  for (const p of sliced) {
    if (patches.length >= LIMITS.MAX_PATCHES) {
      logs.push("Migrate: patch limit reached; stopping further patch generation.");
      break;
    }

    let oldText: string;
    try {
      oldText = fs.readFileSync(p, "utf8");
    } catch {
      continue;
    }

    const edits: TextEdit[] = [];
    for (const rule of renameCommands) {
      const regex = buildCommandRegex(rule.from);
      let match: RegExpExecArray | null;
      while ((match = regex.exec(oldText)) !== null) {
        edits.push({ start: match.index, end: match.index + match[0].length, newText: rule.to });
        findings.push({
          kind: "migration",
          severity: "info",
          message: `Migration: rename command ${rule.from} -> ${rule.to}.`,
          file: p,
          range: rangeFromIndex(oldText, match.index, match[0].length),
          ruleId: "migrate-rename-command",
          confidence: 0.5
        });
      }
    }

    if (!edits.length) continue;

    const conflicts = findEditConflicts(edits);
    if (conflicts.length) {
      logs.push(`Migrate: conflicting edits in ${p}; skipping this file.`);
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
        logs.push(`Migrate: failed to write ${p}`);
      }
    }
  }

  return { findings, patches, filesModified };
}
