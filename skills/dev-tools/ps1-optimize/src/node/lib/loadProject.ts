import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import { Input, ProjectContext } from "../types.js";
import { toPosix, isPsLike } from "./pathUtil.js";

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
    : ["**/*.ps1", "**/*.psm1", "**/*.psd1"];
  const excludeGlobs = input.project.excludeGlobs?.length
    ? input.project.excludeGlobs
    : ["**/node_modules/**", "**/dist/**"];

  const entries = await fg(includeGlobs, {
    cwd: rootAbs,
    ignore: excludeGlobs,
    onlyFiles: true,
    unique: true,
    dot: false,
    followSymbolicLinks: false,
    absolute: true
  });

  const sourceFilePaths = entries
    .filter((p) => isPsLike(p) && !isFileTooLarge(p))
    .map((p) => path.resolve(p));

  logs.push(`Resolved root: ${toPosix(rootAbs)}`);
  logs.push(`Discovered source files: ${sourceFilePaths.length}`);

  const modulePaths = (input.project.modulePaths ?? []).filter((p) => fileExists(p));

  return {
    rootAbs,
    psVersion: input.project.psVersion,
    modulePaths,
    sourceFilePaths
  };
}
