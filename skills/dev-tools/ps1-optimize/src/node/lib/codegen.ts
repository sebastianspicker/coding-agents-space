import fs from "node:fs";
import path from "node:path";
import { CodegenOptions, Finding, Patch, ProjectContext, Targets } from "../types.js";
import { unifiedDiff } from "./diff.js";
import { isWithinRoot } from "./targets.js";

function listScriptFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => name.endsWith(".ps1"));
}

export function buildModuleContent(files: string[]): string {
  const lines = files
    .filter((f) => f.endsWith(".ps1"))
    .map((f) => `. "$PSScriptRoot/${f}"`)
    .sort();
  return lines.length ? `${lines.join("\n")}\n` : "";
}

export async function runCodegen(
  ctx: ProjectContext,
  options: CodegenOptions | undefined,
  applyFixes: boolean,
  logs: string[],
  targets?: Targets
): Promise<{ findings: Finding[]; patches: Patch[]; filesModified: number }> {
  const findings: Finding[] = [];
  const patches: Patch[] = [];
  let filesModified = 0;

  const kind = options?.kind ?? "module";
  if (kind !== "module") {
    findings.push({
      kind: "codegen",
      severity: "info",
      message: `Codegen: unsupported kind '${kind}'.`,
      ruleId: "codegen-unsupported",
      confidence: 1.0
    });
    return { findings, patches, filesModified };
  }

  const targetDirs = options?.targetDirs?.length ? options.targetDirs : ["."];
  logs.push(`Codegen: module index for ${targetDirs.length} director(y/ies).`);

  for (const dir of targetDirs) {
    const absDir = path.resolve(ctx.rootAbs, dir);
    if (!isWithinRoot(absDir, ctx.rootAbs)) {
      logs.push(`Codegen: skipping ${dir} (outside root).`);
      continue;
    }
    if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) continue;

    if (targets?.paths?.length && !targets.paths.some((p) => absDir.endsWith(p) || absDir.includes(p))) {
      continue;
    }

    const files = listScriptFiles(absDir).filter((f) => f !== "index.psm1");
    const content = buildModuleContent(files);
    const outPath = path.join(absDir, "index.psm1");
    const oldText = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
    if (content === oldText) continue;

    const patch = unifiedDiff(outPath, oldText, content);
    patches.push({ path: outPath, patch });
    findings.push({
      kind: "codegen",
      severity: "info",
      message: `Codegen: generated index.psm1 at ${outPath} (${files.length} scripts).`,
      file: outPath,
      ruleId: "codegen-module-index",
      confidence: 0.75
    });

    if (applyFixes) {
      try {
        fs.writeFileSync(outPath, content, "utf8");
        filesModified += 1;
      } catch {
        logs.push(`Codegen: failed to write ${outPath}`);
      }
    }
  }

  return { findings, patches, filesModified };
}
