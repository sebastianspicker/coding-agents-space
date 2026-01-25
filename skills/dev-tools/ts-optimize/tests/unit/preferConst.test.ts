import { describe, it, expect } from "vitest";
import { preferConstEdits } from "../../src/node/lib/rules/preferConst.js";
import { applyEdits } from "../../src/node/lib/edits.js";

describe("prefer-const", () => {
  it("converts simple let to const when never reassigned", () => {
    const src = "let x = 1;\nfunction f(){ return x + 1 }\n";
    const { edits } = preferConstEdits("file.ts", src);
    const out = applyEdits(src, edits);
    expect(out).toContain("const x = 1;");
  });

  it("does not convert if reassigned", () => {
    const src = "let x = 1;\nx = 2;\n";
    const { edits } = preferConstEdits("file.ts", src);
    expect(edits.length).toBe(0);
  });

  it("does not convert destructuring", () => {
    const src = "let {a} = obj;\n";
    const { edits } = preferConstEdits("file.ts", src);
    expect(edits.length).toBe(0);
  });
});
