---
name: ts-lint
description: "Playbook for ts-lint. Use when Lint failures block CI or local dev; you want small, deterministic style/safety fixes; you want patch-first output and controlled application."
---

# ts-lint (Playbook)

Use this when you need **repeatable lint fixes** in TypeScript/JavaScript without turning the change into a refactor.

## When to use (triggers)
- Lint failures block CI or local dev.
- You want small, deterministic style/safety fixes.
- You want patch-first output and controlled application.

## Inputs / Outputs
- Inputs: target repo path + scope, existing lint tooling (eslint/biome/tsc), error output.
- Outputs: small patches, lint passing, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: run the repo's lint command and capture the failing rules/files.
2) Diagnose: separate "safe autofix" from "behavioral" issues.
3) Fix: apply fixes in small batches; keep diffs mechanical.
4) Verify: re-run lint + typecheck/tests where relevant.

## Verification (generic)
Derive from the repo:
- Prefer the package manager indicated by a lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).
- Use the closest scripts: `lint`, `typecheck`, `test`, `build`.

## Optional: use the runtime skill in this repo
The runtime skill `skills/dev-tools/ts-optimize` can emit findings/patches and optionally apply safe fixes.

- Patch-only lint (default):
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    { "type": "lint", "lintRules": ["prefer-const", "no-var"], "targets": { "paths": ["src"] } }
  ]
}
```

- Apply safe fixes after review:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    { "type": "lint", "applyFixes": true, "lintRules": ["prefer-const"], "targets": { "paths": ["src"] } }
  ]
}
```

## Notes / limitations
- In `ts-optimize`, `no-var` is findings-only; only `prefer-const` produces auto patches today.
- For broader lint ecosystems (eslint/biome), use the repo's native tooling and keep changes scoped.

## Definition of Done
- Lint is green for the chosen scope.
- Diffs are mechanical and minimal; no unintended refactors.
- Verification commands are recorded and re-runnable.
