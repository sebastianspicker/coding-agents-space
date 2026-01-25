import path from "node:path";

export function toPosix(p: string): string {
  return p.split(path.sep).join("/");
}

export function isPsLike(p: string): boolean {
  return p.endsWith(".ps1") || p.endsWith(".psm1") || p.endsWith(".psd1");
}
