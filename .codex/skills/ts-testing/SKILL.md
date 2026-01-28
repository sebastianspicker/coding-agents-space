# ts-testing (Playbook)

Use this when you need to debug failing tests or add regression tests in a TS/JS codebase.

## When to use (triggers)
- CI failures, flaky tests, or untested bugfixes.
- You need to add a minimal regression test for a bug.
- You need to turn a repro into a stable automated test.

## Inputs / Outputs
- Inputs: failing command output, test runner, minimal repro, target scope.
- Outputs: fixed tests or fixed code, new regression tests, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Run the failing test in isolation (single file/test name).
   - Capture the exact command and environment assumptions.
2) Diagnose
   - Decide: test issue vs product issue vs environment issue.
   - Reduce to the smallest failing case (inputs, time, randomness).
3) Fix
   - Prefer: add regression test first (red), then fix (green).
   - Keep fixes minimal; avoid refactors while stabilizing tests.
4) Verify
   - Run: isolated test, full test suite (or relevant subset), typecheck/build.

## Optional: runtime skill usage
- Use `.codex/skills/ts-optimize/SKILL.md` for actionable recommendations around testing (e.g., invariants, fast unit tests).
- Use `.codex/skills/ts-debug/SKILL.md` for debugging flow when failures are type/runtime related.

## Definition of Done
- Failure is reproducible locally.
- Regression test exists for the bug (when applicable).
- Tests are stable (no timeouts, no reliance on global state, deterministic where possible).
- Verification commands are recorded.
