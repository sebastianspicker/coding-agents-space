import { Finding } from "../../types.js";
import { TextEdit } from "../edits.js";
import { rangeFromIndex } from "../range.js";

export function computeWhitespaceEdits(
  filePath: string,
  sourceText: string,
  options: { trimTrailingWhitespace: boolean; ensureFinalNewline: boolean }
): { edits: TextEdit[]; findings: Finding[] } {
  const edits: TextEdit[] = [];
  const findings: Finding[] = [];

  if (options.trimTrailingWhitespace) {
    const regex = /[ \t]+(?=\r?\n|$)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(sourceText)) !== null) {
      edits.push({ start: match.index, end: match.index + match[0].length, newText: "" });
      findings.push({
        kind: "lint",
        severity: "info",
        message: "Trailing whitespace detected.",
        file: filePath,
        range: rangeFromIndex(sourceText, match.index, match[0].length),
        ruleId: "trim-trailing-whitespace",
        confidence: 0.7
      });
    }
  }

  if (options.ensureFinalNewline) {
    if (sourceText.length > 0 && !sourceText.endsWith("\n")) {
      edits.push({ start: sourceText.length, end: sourceText.length, newText: "\n" });
      findings.push({
        kind: "lint",
        severity: "info",
        message: "Missing final newline.",
        file: filePath,
        range: rangeFromIndex(sourceText, sourceText.length - 1, 1),
        ruleId: "final-newline",
        confidence: 0.8
      });
    }
  }

  return { edits, findings };
}
