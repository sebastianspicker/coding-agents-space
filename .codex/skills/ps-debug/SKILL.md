# ps-debug (Playbook)

## When to use (triggers)
- PowerShell build/test failures or runtime errors in .ps1/.psm1.
- You need a reproducible fix with minimal change.
- Script/module behavior regressed.

## Inputs / Outputs
- Inputs: repro steps, error output, expected vs actual behavior, target repo path.
- Outputs: root cause summary, patch/diff, verification results.

## Step sequence
1) Repro: reproduce the issue locally and capture the exact failure.
2) Diagnose: isolate the root cause and confirm with evidence.
3) Fix: implement the smallest change that resolves the cause.
4) Verify: re-run relevant checks and confirm the fix.

## Verification
- If working on this repo's runtime skill:
  - `cd skills/dev-tools/ps1-optimize`
  - `npm install`
  - `npm run build`
  - `npm test`
- Otherwise: derive commands from the target repo:
  - Prefer the package manager indicated by a lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`) for TS-based tooling.
  - If the repo has PowerShell tests, look for Pester conventions (e.g. `*.Tests.ps1`) or documented test scripts.
  - Run the closest equivalents of: `test`, `lint`, and a basic smoke run of the affected scripts.

## Definition of Done
- Repro steps are recorded and reliable.
- Root cause is clearly explained.
- Fix is minimal and scoped.
- Verification passes (or failures are documented with reason).
- Follow-up TODOs are captured if any.

## Optional: using the runtime skill
- For action-level recipes (debug/lint/migrate/refactor/codegen/recommend), see `.codex/skills/ps1-optimize/SKILL.md`.
- For how to run in Docker/local and produce JSON output, see `.codex/skills/dev-tools-run-skill/SKILL.md`.
