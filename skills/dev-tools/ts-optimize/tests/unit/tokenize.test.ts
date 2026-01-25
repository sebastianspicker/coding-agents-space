import { describe, it, expect } from "vitest";
import { tokenizeNormalized } from "../../src/node/lib/rules/tokenize.js";

describe("tokenizeNormalized", () => {
  it("normalizes identifiers and literals", () => {
    const t = tokenizeNormalized("function add(a:number,b:number){ return a + b + 42 + 'x' }");
    expect(t).toContain("ID");
    expect(t).toContain("NUM");
    expect(t).toContain("STR");
  });
});
