# ts-debug (Playbook)

## When to use (triggers)
- TypeScript/JavaScript build or test failures.
- Runtime errors, type errors, or regressions in TS/JS code.
- You need a minimal, well-scoped fix with proof.

## Inputs / Outputs
- Inputs: repro steps, error logs/stack traces, expected vs actual behavior, target repo path.
- Outputs: root cause summary, patch/diff, verification results.

## Step sequence
1) Repro: reproduce the issue locally and capture the exact failure.
2) Diagnose: isolate the root cause and confirm with evidence.
3) Fix: implement the smallest change that resolves the cause.
4) Verify: re-run relevant checks and confirm the fix.

## Verification
- If working on this repo's runtime skill:
  - `cd skills/dev-tools/ts-optimize`
  - `npm install`
  - `npm run build`
  - `npm test`
- Otherwise: derive commands from the target repo:
  - Prefer the package manager indicated by a lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).
  - Run `npm run` (or `pnpm -r run` / `yarn run`) and use the closest equivalents of: `test`, `build`, `typecheck`, `lint`.
  - If there is no script, fall back to: `npx tsc -p tsconfig.json` and the repo's documented test runner.

## Definition of Done
- Repro steps are recorded and reliable.
- Root cause is clearly explained.
- Fix is minimal and scoped.
- Verification passes (or failures are documented with reason).
- Follow-up TODOs are captured if any.

## Optional: using the runtime skill
- For action-level recipes (debug/dedupe/lint/migrate/refactor/codegen/recommend), see `.codex/skills/ts-optimize/SKILL.md`.
- For how to run in Docker/local and produce JSON output, see `.codex/skills/dev-tools-run-skill/SKILL.md`.
