import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import { Project } from "ts-morph";
import { Input, ProjectContext } from "../types.js";
import { toPosix, isTsLike } from "./pathUtil.js";

function fileExists(p: string): boolean {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function isFileTooLarge(p: string, maxBytes = 5 * 1024 * 1024): boolean {
  try {
    const st = fs.statSync(p);
    return st.isFile() && st.size > maxBytes;
  } catch {
    return false;
  }
}

export async function loadProject(input: Input, logs: string[]): Promise<ProjectContext> {
  const rootAbs = path.resolve(input.project.root);
  const includeGlobs = input.project.includeGlobs?.length
    ? input.project.includeGlobs
    : ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"];
  const excludeGlobs = input.project.excludeGlobs?.length
    ? input.project.excludeGlobs
    : ["**/node_modules/**", "**/dist/**"];

  const tsconfigPath = input.project.tsconfigPath ? path.resolve(input.project.tsconfigPath) : undefined;
  const hasTsconfig = tsconfigPath ? fileExists(tsconfigPath) : false;

  // Best practice: deterministic glob expansion
  const entries = await fg(includeGlobs, {
    cwd: rootAbs,
    ignore: excludeGlobs,
    onlyFiles: true,
    unique: true,
    dot: false,
    followSymbolicLinks: false,
    absolute: true
  });

  // Filter to TS-like and skip huge files (sandbox limit)
  const sourceFilePaths = entries
    .filter((p) => isTsLike(p) && !isFileTooLarge(p))
    .map((p) => path.resolve(p));

  logs.push(`Resolved root: ${toPosix(rootAbs)}`);
  if (tsconfigPath) logs.push(`tsconfig: ${toPosix(tsconfigPath)} (${hasTsconfig ? "found" : "missing"})`);
  logs.push(`Discovered source files: ${sourceFilePaths.length}`);

  const project = hasTsconfig
    ? new Project({ tsConfigFilePath: tsconfigPath })
    : new Project({
        compilerOptions: {
          target: 9, // ES2022 (numeric enum in TS)
          module: 199, // NodeNext
          moduleResolution: 99, // NodeNext
          strict: true,
          skipLibCheck: true
        }
      });

  // Add files explicitly to ensure analysis covers the workspace even without tsconfig.
  project.addSourceFilesAtPaths(sourceFilePaths);

  // Ensure typechecker is initialized (helps make later phases consistent)
  project.getTypeChecker();

  return { rootAbs, tsconfigPath: hasTsconfig ? tsconfigPath : undefined, sourceFilePaths, project };
}
