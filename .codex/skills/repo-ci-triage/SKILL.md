---
name: repo-ci-triage
description: "Playbook for repo-ci-triage. Use when CI is red after changes; Tests are flaky or environment-dependent; Lint/typecheck/build passes locally but fails in CI."
---

# repo-ci-triage (Playbook)

Use this when CI fails and you need a systematic way to reproduce and fix it locally.

## When to use (triggers)
- CI is red after changes.
- Tests are flaky or environment-dependent.
- Lint/typecheck/build passes locally but fails in CI.

## Inputs / Outputs
- Inputs: CI logs, failing job name, environment details (OS/node version), target branch/commit.
- Outputs: minimal fix, new regression coverage (when applicable), and a reproduction recipe.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Identify the failing job and exact command(s).
   - Match the runtime versions (Node, pnpm/yarn, OS) as closely as possible.
2) Diagnose
   - Classify: deterministic failure vs flake vs environment mismatch.
   - Reduce to the smallest failing command (single test file, single package).
3) Fix
   - Prefer making the test deterministic over adding sleeps/timeouts.
   - Keep fixes small; avoid refactors while chasing CI stability.
4) Verify
   - Re-run the exact failing command(s) locally.
   - Run the minimal relevant suite (not necessarily everything) and document it.

## Definition of Done
- CI failure is reproducible locally (or the reason it isn't is documented).
- Fix is minimal and addresses the root cause.
- Verification matches CI commands as closely as possible.
