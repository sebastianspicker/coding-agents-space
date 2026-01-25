import path from "node:path";
import { Targets } from "../types.js";
import { toPosix } from "./pathUtil.js";

function normalizePath(p: string): string {
  return toPosix(path.resolve(p));
}

export function isWithinRoot(filePath: string, rootAbs: string): boolean {
  const rel = path.relative(rootAbs, filePath);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

export function shouldAnalyzeFile(filePath: string, rootAbs: string, targets?: Targets): boolean {
  if (!targets?.paths?.length) return true;

  const absFile = normalizePath(filePath);
  const rel = toPosix(path.relative(rootAbs, absFile));
  if (rel.startsWith("..")) return false;

  return targets.paths.some((p) => {
    const norm = toPosix(path.normalize(p));
    if (path.isAbsolute(p)) {
      return absFile.startsWith(normalizePath(p));
    }
    return rel === norm || rel.startsWith(norm.endsWith("/") ? norm : `${norm}/`);
  });
}
