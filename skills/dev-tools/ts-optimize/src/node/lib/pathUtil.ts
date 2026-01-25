import path from "node:path";

export function toPosix(p: string): string {
  return p.split(path.sep).join("/");
}

export function isTsLike(p: string): boolean {
  return p.endsWith(".ts") || p.endsWith(".tsx") || p.endsWith(".mts") || p.endsWith(".cts");
}
