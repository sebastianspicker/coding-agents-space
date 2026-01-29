---
name: ps-testing
description: "Playbook for ps-testing. Use when CI failures or flaky PowerShell tests; Bugfix needs a regression test; you need a stable, automatable repro."
---

# ps-testing (Playbook)

Use this when you need to debug failing PowerShell tests or add regression tests (typically Pester).

## When to use (triggers)
- CI failures or flaky PowerShell tests.
- Bugfix needs a regression test.
- You need a stable, automatable repro.

## Inputs / Outputs
- Inputs: failing command output, test runner conventions, minimal repro.
- Outputs: fixed tests or fixed code, new regression tests, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: run failing tests in isolation; capture exact invocation.
2) Diagnose: decide test vs product vs environment issue; reduce to minimal case.
3) Fix: add regression test first when possible; then implement the fix.
4) Verify: run isolated + suite tests; smoke test entry points.

## Optional: runtime skill usage
Use `.codex/skills/ps1-optimize/SKILL.md` for analyzer diagnostics and deterministic lint/codegen/migrations.

## Definition of Done
- Failure is reproducible locally.
- Regression test exists (when applicable).
- Tests are stable and deterministic.
- Verification commands are recorded.
