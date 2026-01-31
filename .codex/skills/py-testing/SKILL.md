---
name: py-testing
description: "Playbook for py-testing. Use when adding or fixing Python tests (pytest/unittest), creating regression tests, and making tests reliable and CI-friendly."
---

# py-testing (Playbook)

Use this to add tests that are **stable**, **fast**, and **actually verify behavior**.

## When to use (triggers)
- Bugfix needs a regression test.
- Tests are flaky or hard to reproduce in CI.
- You’re introducing new behavior and need guardrails.

## Inputs / Outputs
- Inputs: target behavior, how to reproduce failure, test framework, existing test patterns.
- Outputs: new/updated tests, plus commands to run them narrowly and broadly.

## Step sequence (Red -> Green -> Refactor -> Verify)
1) Red
   - Write the smallest failing test that captures the bug/behavior.
   - Run it and confirm it fails for the right reason.
2) Green
   - Implement the minimal code to pass.
3) Refactor
   - Clean up test readability without changing intent.
4) Verify
   - Run affected suite + any required linters/typecheckers.

## Test quality rules
- Prefer assertions on **outputs/side effects**, not on mocks.
- Keep tests deterministic:
  - freeze time if needed
  - set seeds
  - avoid relying on dict iteration ordering unless required
- Prefer dependency injection over patching global state.

## Suggested commands
- Narrow: `python -m pytest -q path/to/test.py::test_name`
- Broader: `python -m pytest -q`
- Optional: coverage if configured (don’t add new tooling unless requested).

## Definition of Done
- Test fails before fix and passes after fix (for bugfixes).
- Test is deterministic and readable.
- Relevant test suites pass locally and in CI (if applicable).

## Related skills
- `core-tdd-red-green` for the general Red-Green-Refactor workflow.
- `core-verify-before-claim` before claiming “tests pass”.

## Templates
- Regression test checklist: `references/regression-checklist.md`
- `pytest` test file template: `assets/test_template.py`

## Credits
- TDD workflow alignment inspired by [obra/superpowers](https://github.com/obra/superpowers) and modern Python testing patterns.
