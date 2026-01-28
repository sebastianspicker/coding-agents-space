import { Range } from "../types.js";

export function rangeFromIndex(text: string, start: number, length: number): Range {
  const before = text.slice(0, Math.max(0, start));
  const startLine = before.split("\n").length;
  const startCol = before.length - before.lastIndexOf("\n");

  const segment = text.slice(start, Math.max(0, start + length));
  const segmentLines = segment.split("\n");
  const endLine = startLine + segmentLines.length - 1;
  const endCol =
    segmentLines.length === 1 ? startCol + segment.length : segmentLines[segmentLines.length - 1]!.length + 1;

  return { startLine, startCol, endLine, endCol };
}
