---
name: ts-quality
description: "Playbook for ts-quality. Use when you need quality improvements in TS/JS (lint, types, formatting, dead code, perf); you are preparing a codebase for refactor or migration; you need a punch list of issues with verified fixes."
---

# ts-quality (Playbook)

## When to use (triggers)
- You need quality improvements in TS/JS (lint, types, formatting, dead code, perf).
- You are preparing a codebase for refactor or migration.
- You need a punch list of issues with verified fixes.

## Inputs / Outputs
- Inputs: target repo path, quality goals, existing lint/test tooling.
- Outputs: findings list, prioritized fixes, verification results.

## Step sequence
1) Repro: run existing quality checks and capture failures.
2) Diagnose: group issues by root cause and impact.
3) Fix: apply targeted fixes in small batches.
4) Verify: re-run quality checks and confirm improvements.

## Verification
- If working on this repo's runtime skill:
  - `cd skills/dev-tools/ts-optimize`
  - `npm install`
  - `npm run build`
  - `npm test`
- Otherwise: derive commands from the target repo:
  - Prefer the package manager indicated by a lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).
  - Run the repo's quality gate scripts: `lint`, `typecheck`, `test`, and `build` (whichever exist).

## Definition of Done
- Findings are categorized and prioritized.
- Fixes are minimal and auditable.
- Quality checks pass (or known exceptions are documented).
- No unrelated refactors slipped in.

## Optional: using the runtime skill
- For action-level recipes (lint/dedupe/recommend), see `.codex/skills/ts-optimize/SKILL.md`.
