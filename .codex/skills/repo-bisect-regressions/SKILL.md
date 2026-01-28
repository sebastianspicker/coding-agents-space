# repo-bisect-regressions (Playbook)

Use this when you suspect a regression and need to identify the offending change quickly and reproducibly.

## When to use (triggers)
- Something used to work and now fails; you don't know which commit introduced it.
- The failure is intermittent but you can make it deterministic via a repro harness.
- You need strong evidence before making a risky fix.

## Inputs / Outputs
- Inputs: good baseline (commit/tag), bad baseline (commit/head), a deterministic repro command.
- Outputs: the first bad commit (or a narrowed set), plus verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Create a deterministic command that returns success/failure.
   - Make it fast: avoid full suites if you can isolate to a single test/script.
2) Diagnose (bisect)
   - Identify a known-good and known-bad revision.
   - Use `git bisect` with the repro command.
3) Fix
   - Once culprit is found, decide whether to revert, patch, or follow-up with a safer change.
4) Verify
   - Confirm fix on the repro and on broader verification commands.

## Definition of Done
- Regression origin is identified with evidence.
- Fix is minimal and verified.
- Any remaining uncertainty is documented (flake vs deterministic).
