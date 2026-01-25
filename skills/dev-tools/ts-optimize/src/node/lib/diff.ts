import { createTwoFilesPatch } from "diff";

export function unifiedDiff(path: string, oldText: string, newText: string): string {
  // Best practice: stable, context-limited patch (small-ish output)
  return createTwoFilesPatch(
    path,
    path,
    oldText,
    newText,
    "",
    "",
    { context: 3 }
  );
}
