---
name: core-tdd-red-green
description: "Core TDD workflow. Use when implementing features/bugfixes with a Red-Green-Refactor loop and verifiable regression coverage."
---

# core-tdd-red-green (Playbook)

Use this when behavior correctness matters and you want reliable progress.

## When to use (triggers)
- New feature work
- Bugfix work
- Refactors that should preserve behavior

## Step sequence (Red -> Green -> Refactor -> Verify)
1) Red
   - Write the smallest test that expresses the desired behavior.
   - Run it and confirm it fails for the right reason.
2) Green
   - Implement the minimum change to pass.
3) Refactor
   - Clean up without changing behavior.
4) Verify
   - Run the broader test suite and other relevant checks.

## Rules
- If you didn’t see the test fail, you don’t know what it proves.
- Prefer tests that exercise real code paths over mock-only assertions.
- Keep one behavior per test when possible.

## When tests don’t exist (legacy / scripts / infra)
- Write a **characterization test** first:
  - pin current behavior (even if ugly)
  - then refactor/bugfix safely
- If a full test harness doesn’t exist, use a thin “harness test”:
  - a script that runs the behavior and asserts on output/exit code

## Choosing the test level
- Unit tests: fast logic, pure functions, edge cases.
- Integration tests: boundaries (filesystem, DB, network) with controlled fixtures.
- E2E tests: user flows, critical paths, fewer tests but higher confidence.

## Definition of Done
- Red/Green cycle was followed (observed failure then pass).
- Refactor keeps tests green.
- Broader verification gates pass.

## Credits
- Inspired by [obra/superpowers](https://github.com/obra/superpowers) (adapted and shortened; focused on Codex-style verification and multi-language repos).

## Templates
- Red/Green checklist: `assets/red-green-checklist.md`
