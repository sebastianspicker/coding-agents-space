# ts-codegen (Playbook)

Use this when you need deterministic, reviewable code generation in TS/JS projects (barrels/indices, small scaffolds).

## When to use (triggers)
- You need `index.ts` barrels for stable imports.
- You want to reduce manual export maintenance.
- You need a repeatable generation step with a review gate.

## Inputs / Outputs
- Inputs: target directories, desired export surface, constraints (no circular deps, stable ordering).
- Outputs: generated files (or patches), verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: run codegen on a single directory first.
2) Diagnose: ensure export surface is correct and does not introduce cycles.
3) Fix: apply generation; keep diffs isolated to generated files.
4) Verify: run typecheck/build/tests; validate import paths and tree-shaking behavior (if relevant).

## Optional: use the runtime skill in this repo
`skills/dev-tools/ts-optimize` supports `codegen.kind=barrel` which generates `index.ts` with `export * from ...` lines.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    { "type": "codegen", "applyFixes": true, "codegen": { "kind": "barrel", "targetDirs": ["src/utils"] } }
  ]
}
```

## Notes / limitations
- The current barrel generator excludes `index.ts(x)` and `*.d.ts` and sorts exports for stability.
- Avoid generating barrels that create cycles; prefer domain-local indices.

## Definition of Done
- Generated output is deterministic and reviewed.
- Typecheck/build/tests pass.
- No unintended public API expansion (or it is documented).
