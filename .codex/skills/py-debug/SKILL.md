---
name: py-debug
description: "Playbook for py-debug. Use when debugging Python issues (exceptions, wrong results, environment mismatches, flaky tests) with minimal repros and verified fixes."
---

# py-debug (Playbook)

Use this for Python debugging across scripts, libraries, and services (including CI-only failures).

## When to use (triggers)
- Tracebacks, failing tests, unexpected output, performance regressions.
- Works locally but fails in CI / Docker / a different venv.
- Type/runtime mismatch: mypy/ruff pass but runtime fails (or vice versa).

## Inputs / Outputs
- Inputs: exact traceback/logs, Python version, dependency manager, repro steps, expected behavior.
- Outputs: root cause, minimal fix, and verification commands.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Capture environment:
     - `python -V`
     - `python -c \"import sys; print(sys.executable); print(sys.path)\"`
     - `pip --version` (or `poetry --version`, `uv --version`)
   - Run the narrowest failing target (single test, single module).
2) Diagnose
   - Categorize failure:
     - environment/packaging
     - I/O and file paths
     - timezones/locale
     - nondeterminism (random, time, ordering)
     - concurrency/async
   - Add *temporary* diagnostics (log values, asserts) and remove before final patch.
3) Fix
   - Fix at the source (not symptom).
   - Prefer small, reviewable changes.
4) Verify
   - Re-run the narrow repro.
   - Run the repo’s standard verify set for the affected package.

## Debugging toolbox (use sparingly)
- `pytest -q path/to/test.py::test_name -k keyword`
- `python -X faulthandler -m pytest ...` for hangs/crashes
- `python -m pdb script.py` or `pytest --pdb`
- Logging:
  - enable debug logs via env var / flag
  - avoid printing secrets

## Common root causes
- Wrong interpreter/venv activated
- Missing optional dependency
- Relative paths (tests rely on CWD)
- Unpinned dependency breaking behavior
- Flaky tests due to time/randomness

## Definition of Done
- Root cause and reproduction are documented.
- Fix is minimal, and regression coverage is added when feasible.
- Narrow repro + relevant repo checks pass.

## Related skills
- `core-debug-root-cause` for strict hypothesis testing.
- `py-testing` for regression test creation.

## References
- Minimal repro harness: `assets/repro-template.md`

## Credits
- Influenced by Python triage patterns from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (modern Python triage), adapted to multi-language repos and CI mismatch debugging.
