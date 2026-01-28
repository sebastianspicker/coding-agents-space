# ps-quality (Playbook)

## When to use (triggers)
- You need quality improvements in PowerShell (lint, style, dead code, perf).
- You are preparing a module for refactor or migration.
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
  - `cd skills/dev-tools/ps1-optimize`
  - `npm install`
  - `npm run build`
  - `npm test`
- Otherwise: derive commands from the target repo:
  - Run PSScriptAnalyzer (or the repo's lint step) if available.
  - Run tests (Pester if present) and a smoke run of key scripts.

## Definition of Done
- Findings are categorized and prioritized.
- Fixes are minimal and auditable.
- Quality checks pass (or known exceptions are documented).
- No unrelated refactors slipped in.

## Optional: using the runtime skill
- For action-level recipes (lint/recommend), see `.codex/skills/ps1-optimize/SKILL.md`.
