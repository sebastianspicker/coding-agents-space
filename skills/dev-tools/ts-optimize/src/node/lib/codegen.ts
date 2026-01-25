import fs from "node:fs";
import path from "node:path";
import { CodegenOptions, Finding, Patch, ProjectContext, Targets } from "../types.js";
import { unifiedDiff } from "./diff.js";
import { isWithinRoot } from "./targets.js";

function isModuleFile(name: string): boolean {
  if (name === "index.ts" || name === "index.tsx") return false;
  if (name.endsWith(".d.ts")) return false;
  return name.endsWith(".ts") || name.endsWith(".tsx");
}

export function buildBarrelContent(files: string[]): string {
  const lines = files
    .filter(isModuleFile)
    .map((f) => `export * from "./${f.replace(/\.[^.]+$/, "")}";`)
    .sort();
  return lines.length ? `${lines.join("\n")}\n` : "";
}

function listModuleFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter(isModuleFile);
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

  const kind = options?.kind ?? "barrel";
  if (kind !== "barrel") {
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
  logs.push(`Codegen: barrel exports for ${targetDirs.length} director(y/ies).`);

  for (const dir of targetDirs) {
    const absDir = path.resolve(ctx.rootAbs, dir);
    if (!isWithinRoot(absDir, ctx.rootAbs)) {
      logs.push(`Codegen: skipping ${dir} (outside root).`);
      continue;
    }
    if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) continue;

    const files = listModuleFiles(absDir);
    const content = buildBarrelContent(files);
    const outPath = path.join(absDir, "index.ts");
    const oldText = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
    if (content === oldText) continue;

    const patch = unifiedDiff(outPath, oldText, content);
    patches.push({ path: outPath, patch });
    findings.push({
      kind: "codegen",
      severity: "info",
      message: `Codegen: generated barrel at ${outPath} (${files.length} exports).`,
      file: outPath,
      ruleId: "codegen-barrel",
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
