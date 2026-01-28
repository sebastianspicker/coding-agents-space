# repo-code-review (Playbook)

Use this when you need to review changes (yours or others) for correctness, safety, and maintainability.

## When to use (triggers)
- You are reviewing a PR or preparing one for review.
- You need a safety pass before shipping changes.
- You need to assess risk in runtime skills/contracts.

## Inputs / Outputs
- Inputs: diff/PR, context on expected behavior, verification commands, compatibility constraints.
- Outputs: prioritized findings, required changes, and verification expectations.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Ensure there is a reproducible verification path for the change.
2) Diagnose
   - Review in this order:
     - Correctness/regressions
     - Security/sandbox boundaries
     - Contract/schema compatibility
     - Tests/coverage gaps
     - Maintainability/perf
3) Fix
   - Request small, targeted changes; avoid broad refactors unless necessary.
4) Verify
   - Require evidence: commands run and results (or a reason why not).

## High-risk areas in this repo
- Runtime skills under `skills/dev-tools/*` (behavior + sandbox semantics)
- Shared schemas under `contracts/`
- Tool definition wiring under `agent-config/`

## Definition of Done
- Major risks are addressed or explicitly accepted.
- Verification is defined and reasonable.
- The change is reviewable and consistent with repo conventions.
