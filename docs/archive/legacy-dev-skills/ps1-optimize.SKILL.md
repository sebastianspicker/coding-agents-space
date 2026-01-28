---
name: ps1-optimize
description: Use when optimizing PowerShell scripts or modules with diagnostics, lint fixes, module migrations, refactor patches, codegen, or recommendations. Patch-first output.
---

# PowerShell Optimizer

## When to use
- The user wants to analyze or optimize PowerShell (.ps1/.psm1) code.
- You need diagnostics, lint fixes, command migrations, refactor patches, module codegen, or recommendations.

## Inputs and outputs
- Input is JSON via stdin. Use `schemas/input.schema.json` and `examples/input.*.json` as templates.
- Output is JSON with `data.findings`, `data.metrics`, and optional `data.patches[]` (unified diff).
- The tool only writes files when `applyFixes=true` on an action.

## Execution
- Preferred: run in the Docker sandbox and mount the target project to `/workspace`.
- Alternative: build locally (`npm install`, `npm run build`) and run `node dist/index.js < input.json`.

## Notes
- Diagnostics are best-effort and depend on `pwsh` and PSScriptAnalyzer availability.

## Workflow
1) Prepare input JSON with `project.root` (must be under `/workspace`) and optional `project.psVersion`.
2) Run the tool and inspect findings and patches.
3) Apply patches manually unless the user explicitly asked for `applyFixes=true`.
