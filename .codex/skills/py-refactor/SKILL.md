---
name: py-refactor
description: "Playbook for py-refactor. Use when performing safe Python refactors (rename/restructure/extract functions) while preserving behavior and verification evidence."
---

# py-refactor (Playbook)

Use this for controlled refactors: rename, reorganize modules, simplify logic, remove duplication.

## When to use (triggers)
- You need to change structure without changing behavior.
- You’re preparing code for new features or bugfixes.
- You want safer abstractions and clearer boundaries.

## Inputs / Outputs
- Inputs: scope, constraints (no behavior change), existing tests/CI, success criteria.
- Outputs: small incremental patches + verification results.

## Step sequence (Baseline -> Refactor -> Verify)
1) Baseline
   - Identify call sites and current behavior.
   - Ensure tests exist; if not, add minimal characterization tests.
2) Refactor
   - Make one mechanical change at a time (rename, extract, move).
   - Keep diffs reviewable.
3) Verify
   - Run the smallest relevant test subset, then broader gates.

## Refactor rules
- No “while I’m here” rewrites.
- Prefer pure functions over hidden side effects.
- Preserve public APIs unless explicitly changing them.

## Definition of Done
- Refactor preserves behavior (tests/characterization prove it).
- Changes are incremental and easy to review.
- Verification gates pass for the affected scope.

## Related skills
- `py-testing` to add characterization/regression tests.
- `repo-git-pr-workflow` for splitting large refactors safely.

## Template
- Refactor plan template: `assets/refactor-plan.md`

## Credits
- Refactor discipline aligns with the repo’s `ts-refactor`/`ps-refactor` patterns; adapted to Python-specific risks (imports, side effects, packaging).
