---
name: core-debug-root-cause
description: "Core debugging workflow. Use when debugging any technical issue with a root-cause-first approach and evidence-based fixes."
---

# core-debug-root-cause (Playbook)

Use this whenever you’re about to “try a fix” without strong evidence. This playbook keeps debugging scientific and efficient.

## When to use (triggers)
- Any bug, failing test, crash, or unexpected behavior.
- You’ve already tried 1–2 fixes and the issue persists.
- The system has multiple components (frontend/backend/db/CI) and the failure is unclear.

## Inputs / Outputs
- Inputs: symptom, logs, repro steps, recent changes, environment details.
- Outputs: root cause, minimal fix, regression test (when feasible), and verification evidence.

## Step sequence (Investigate -> Hypothesize -> Test -> Fix -> Verify)
1) Investigate (no fixes yet)
   - Read the full error output and stack trace.
   - Reproduce deterministically (or document nondeterminism).
   - Identify the smallest failing unit (single test, endpoint, file).
2) Hypothesize
   - Write one hypothesis: “X causes Y because Z.”
3) Test
   - Change one variable to confirm/refute the hypothesis.
4) Fix
   - Fix at the source.
   - Keep changes minimal and reversible.
5) Verify
   - Re-run the original repro.
   - Run the relevant verification gates (tests/build/lint as appropriate).

## Hard rules
- Don’t stack multiple speculative fixes.
- Don’t refactor “while debugging” unless necessary to expose the bug.
- Remove temporary debug output before finalizing.

## Evidence patterns (high leverage)
- **Prefer a “one command” repro** (single test, single script, single request).
- **Log boundaries, not everything**: log input and output at component boundaries (API → service → DB).
- **Binary search changes**: if it’s a regression and the repro is deterministic, use git bisect.

## This repo: where to look / what to run
- If it looks like a regression: use `.codex/skills/repo-bisect-regressions/SKILL.md`.
- If you’re unsure which checks to run: use `.codex/skills/repo-run-commands/SKILL.md`.

## Definition of Done
- Root cause is identified and evidenced.
- Fix is minimal and regression coverage exists when feasible.
- Verification gates are run and results are reported.

## Credits
- Inspired by [obra/superpowers](https://github.com/obra/superpowers) (concepts adapted; rewritten to match this repo’s verification culture and Codex workflows).

## Template
- Minimal debug log: `assets/debug-log.md`
