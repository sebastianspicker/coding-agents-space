import { describe, it, expect } from "vitest";
import { buildModuleContent } from "../../src/node/lib/codegen.js";

describe("codegen module", () => {
  it("generates dot-sourcing lines sorted", () => {
    const content = buildModuleContent(["b.ps1", "a.ps1", "notes.txt"]);
    expect(content).toBe('. "$PSScriptRoot/a.ps1"\n. "$PSScriptRoot/b.ps1"\n');
  });
});
