import fs from "node:fs";
import path from "node:path";
import { ProjectContext, Finding } from "../types.js";
import { LIMITS } from "./limits.js";
import { findComplexityHotspots } from "./heuristics.js";

type Focus = "web" | "node" | "numerics" | "perf" | "bundle" | "types" | "testing";

function readJsonIfExists(p: string): any | undefined {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return undefined;
  }
}

export async function runRecommend(
  ctx: ProjectContext,
  focus: Focus[],
  logs: string[]
): Promise<{ findings: Finding[]; metrics: { estimatedComplexityHotspots: number } }> {
  const findings: Finding[] = [];
  let complexityHotspots = 0;

  // tsconfig-based recommendations (best practice)
  if (focus.includes("types")) {
    const tsconfig = ctx.tsconfigPath ? readJsonIfExists(ctx.tsconfigPath) : undefined;
    const co = tsconfig?.compilerOptions ?? {};

    const wants = [
      ["strict", true],
      ["noImplicitAny", true],
      ["noUncheckedIndexedAccess", true],
      ["exactOptionalPropertyTypes", true]
    ] as const;

    for (const [k, v] of wants) {
      if (co[k] !== v) {
        findings.push({
          kind: "recommendation",
          severity: "info",
          message: `Types: consider enabling compilerOptions.${k} = ${String(v)} for stronger guarantees.`,
          file: ctx.tsconfigPath,
          ruleId: `tsconfig-${k}`,
          confidence: 0.75
        });
      }
    }

    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Types: prefer `unknown` over `any` for untrusted inputs; narrow using type guards.",
      ruleId: "types-unknown-over-any",
      confidence: 0.7
    });

    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Types: use `import type { ... }` to avoid bundling-only imports and speed up builds.",
      ruleId: "types-import-type",
      confidence: 0.6
    });
  }

  if (focus.includes("testing")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Testing: add fast unit tests for numerics invariants (energy conservation, bounds, symmetry) and run them in CI.",
      ruleId: "testing-numerics-invariants",
      confidence: 0.65
    });
  }

  if (focus.includes("perf") || focus.includes("numerics")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Perf/Numerics: reduce GC churn in hot loops (reuse arrays, prefer TypedArrays, avoid temporary objects).",
      ruleId: "perf-gc-churn",
      confidence: 0.7
    });
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Perf/Numerics: consider Struct-of-Arrays (SoA) layouts for particles/fields to improve cache locality.",
      ruleId: "numerics-soa",
      confidence: 0.6
    });
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Perf/Numerics: benchmark critical kernels with realistic sizes; tiny microbenchmarks can mislead due to JIT warmup.",
      ruleId: "perf-benchmark-warmup",
      confidence: 0.65
    });
  }

  if (focus.includes("bundle") || focus.includes("web")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Web/Bundle: ensure tree-shaking friendliness (pure functions, avoid side effects at module top-level).",
      ruleId: "bundle-tree-shaking",
      confidence: 0.6
    });
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Web/Bundle: prefer modern target (ES2020+) where possible and let the bundler transpile only for needed browsers.",
      ruleId: "bundle-modern-target",
      confidence: 0.55
    });
  }

  if (focus.includes("node")) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: "Node: for CLI/tools prefer ESM + NodeNext; keep dependency surface minimal and pin versions for reproducibility.",
      ruleId: "node-esm-pinning",
      confidence: 0.65
    });
  }

  // Optional: light complexity sampling for project-level hint
  const files = ctx.project.getSourceFiles().slice(0, 60);
  for (const sf of files) {
    const { count } = findComplexityHotspots(sf, 20, 5);
    complexityHotspots += count;
  }
  if (complexityHotspots > 0) {
    findings.push({
      kind: "recommendation",
      severity: "info",
      message: `Project: detected complexity hotspots in a sample. Consider a small refactor budget for readability and testability.`,
      ruleId: "project-complexity-sample",
      confidence: 0.5
    });
  }

  if (findings.length > LIMITS.MAX_FINDINGS_PER_CATEGORY) {
    logs.push("Recommend: findings truncated due to max limit.");
    findings.length = LIMITS.MAX_FINDINGS_PER_CATEGORY;
  }

  return { findings, metrics: { estimatedComplexityHotspots: complexityHotspots } };
}
