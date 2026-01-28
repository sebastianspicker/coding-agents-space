# ts-runtime-debug (Playbook)

Use this for **runtime debugging** in TS/JS: stack traces, breakpoints, logging/tracing, reproducing crashes or logic bugs.

## When to use (triggers)
- The bug is runtime-only (not a type error): crashes, wrong results, weird state.
- You need to isolate a regression with strong evidence.
- You need to debug complex control flow or async behavior.

## Inputs / Outputs
- Inputs: repro steps, logs/stack traces, environment details, suspected area, verification commands.
- Outputs: root cause explanation, minimal fix, improved observability (optional), verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Create a minimal repro harness (script, unit test, or fixture).
   - Reduce the repro to the smallest input/state that fails.
2) Diagnose
   - Prefer evidence:
     - Add targeted logging with clear tags.
     - Use debugger/breakpoints on the smallest repro.
   - If regression suspected, bisect by commits (or narrow by feature flags).
3) Fix
   - Apply the smallest behavioral change that addresses the root cause.
   - If appropriate, keep the new log/tracing behind a debug flag.
4) Verify
   - Run the minimal repro harness until stable.
   - Run tests/typecheck/build as appropriate.

## Verification (generic)
- Run `test`, `typecheck`, `lint`, `build` scripts if present.
- Ensure the original repro is fixed and no new warnings/errors appear.

## Definition of Done
- Repro is stable and documented.
- Root cause is explained with evidence (not guesswork).
- Fix is minimal and verified.
