---
name: ts-optimize
description: Use when optimizing TypeScript or JavaScript projects with diagnostics, lint fixes, import migrations, codegen (barrels), dedupe, or performance recommendations. Patch-first output.
---

# TypeScript Optimizer

## When to use
- The user wants to analyze or optimize a TS/JS codebase.
- You need diagnostics (quick/medium/complex), lint fixes, dedupe candidates, refactor patches, import migrations, barrel codegen, or recommendations.

## Inputs and outputs
- Input is JSON via stdin. Use `schemas/input.schema.json` and `examples/input.*.json` as templates.
- Output is JSON with `data.findings`, `data.metrics`, and optional `data.patches[]` (unified diff).
- The tool only writes files when `applyFixes=true` on an action.

## Execution
- Preferred: run in the Docker sandbox and mount the target project to `/workspace`.
- Alternative: build locally (`npm install`, `npm run build`) and run `node dist/index.js < input.json`.

## Workflow
1) Prepare input JSON with `project.root` (must be under `/workspace`) and optional `project.tsconfigPath`.
2) Run the tool and inspect findings and patches.
3) Apply patches manually unless the user explicitly asked for `applyFixes=true`.
