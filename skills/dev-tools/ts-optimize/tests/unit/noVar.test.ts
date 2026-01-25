import { describe, it, expect } from "vitest";
import { findNoVarFindings } from "../../src/node/lib/rules/noVar.js";

describe("no-var", () => {
  it("flags var declarations", () => {
    const src = "var x = 1;\nfunction f(){ var y = 2; return y }\n";
    const findings = findNoVarFindings("file.ts", src);
    expect(findings.length).toBe(2);
  });
});
