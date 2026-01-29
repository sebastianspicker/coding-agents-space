---
name: ps-refactor
description: "Playbook for ps-refactor. Use when Planned refactors in PowerShell scripts/modules (rename, re-structure, module migration); Behavior must stay the same while improving structure or readability; you need controlled, low-risk changes with verification."
---

# ps-refactor (Playbook)

## When to use (triggers)
- Planned refactors in PowerShell scripts/modules (rename, re-structure, module migration).
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
  - `cd skills/dev-tools/ps1-optimize`
  - `npm install`
  - `npm run build`
  - `npm test`
- Otherwise: derive commands from the target repo:
  - Run the repo's test runner (Pester if present) and any linting/analyzer steps.
  - Smoke test the changed entry points (scripts or module functions).

## Definition of Done
- Scope is explicit and agreed.
- Refactor preserves behavior.
- Changes are incremental and easy to review.
- Verification passes (or failures are documented with reason).
- Any follow-up debt is logged.

## Optional: using the runtime skill
- For action-level recipes (migrate/refactor/codegen), see `.codex/skills/ps1-optimize/SKILL.md`.
- For patch review/apply workflow, see `.codex/skills/dev-tools-patches/SKILL.md`.
