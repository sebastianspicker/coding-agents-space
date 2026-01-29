---
name: ts-refactor
description: "Playbook for ts-refactor. Use when Planned refactors in TypeScript/JavaScript code (rename, re-structure, API migration); Behavior must stay the same while improving structure or readability; you need controlled, low-risk changes with verification."
---

# ts-refactor (Playbook)

## When to use (triggers)
- Planned refactors in TypeScript/JavaScript code (rename, re-structure, API migration).
- Behavior must stay the same while improving structure or readability.
- You need controlled, low-risk changes with verification.

## Inputs / Outputs
- Inputs: target scope, constraints, existing tests, success criteria.
- Outputs: refactor plan summary, patch/diff, verification results.

## Step sequence
1) Repro: establish a clean baseline and run existing checks.
2) Diagnose: map dependencies, identify safe seams, define boundaries.
3) Fix: refactor in small, reversible steps.
4) Verify: re-run checks and compare behavior to baseline.

## Verification
- If working on this repo's runtime skill:
  - `cd skills/dev-tools/ts-optimize`
  - `npm install`
  - `npm run build`
  - `npm test`
- Otherwise: derive commands from the target repo:
  - Prefer the package manager indicated by a lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).
  - Run the project's refactor-safety checks: `test`, `build`, `typecheck`, and `lint` (if available).

## Definition of Done
- Scope is explicit and agreed.
- Refactor preserves behavior.
- Changes are incremental and easy to review.
- Verification passes (or failures are documented with reason).
- Any follow-up debt is logged.

## Optional: using the runtime skill
- For action-level recipes (migrate/refactor/codegen), see `.codex/skills/ts-optimize/SKILL.md`.
- For patch review/apply workflow, see `.codex/skills/dev-tools-patches/SKILL.md`.
