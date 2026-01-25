import { describe, it, expect } from "vitest";
import { computeWhitespaceEdits } from "../../src/node/lib/rules/whitespace.js";
import { applyEdits } from "../../src/node/lib/edits.js";

describe("whitespace", () => {
  it("trims trailing whitespace", () => {
    const src = "Write-Output 'hi'  \n";
    const { edits } = computeWhitespaceEdits("file.ps1", src, {
      trimTrailingWhitespace: true,
      ensureFinalNewline: false
    });
    const out = applyEdits(src, edits);
    expect(out).toBe("Write-Output 'hi'\n");
  });

  it("adds final newline", () => {
    const src = "Write-Output 'hi'";
    const { edits } = computeWhitespaceEdits("file.ps1", src, {
      trimTrailingWhitespace: false,
      ensureFinalNewline: true
    });
    const out = applyEdits(src, edits);
    expect(out).toBe("Write-Output 'hi'\n");
  });
});
