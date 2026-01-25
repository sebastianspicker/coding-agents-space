export type TextEdit = { start: number; end: number; newText: string };

export function applyEdits(text: string, edits: TextEdit[]): string {
  const sorted = [...edits].sort((a, b) => b.start - a.start);
  let out = text;
  for (const e of sorted) {
    out = out.slice(0, e.start) + e.newText + out.slice(e.end);
  }
  return out;
}

export function findEditConflicts(edits: TextEdit[]): TextEdit[] {
  const sorted = [...edits].sort((a, b) => a.start - b.start);
  const conflicts: TextEdit[] = [];

  for (let i = 1; i < sorted.length; i += 1) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    if (curr.start < prev.end) {
      conflicts.push(prev, curr);
    }
  }

  return conflicts;
}
