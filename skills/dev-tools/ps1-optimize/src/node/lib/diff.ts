import { createTwoFilesPatch } from "diff";

export function unifiedDiff(path: string, oldText: string, newText: string): string {
  return createTwoFilesPatch(path, path, oldText, newText, "", "", { context: 3 });
}
