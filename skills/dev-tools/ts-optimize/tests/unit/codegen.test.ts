import { describe, it, expect } from "vitest";
import { buildBarrelContent } from "../../src/node/lib/codegen.js";

describe("codegen barrel", () => {
  it("generates stable export order without extensions", () => {
    const content = buildBarrelContent(["b.ts", "a.tsx", "index.ts", "types.d.ts"]);
    expect(content).toBe('export * from "./a";\nexport * from "./b";\n');
  });
});
