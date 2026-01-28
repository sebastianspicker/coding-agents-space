# repo-run-commands (Playbook)

Use this when you need to figure out **which commands to run where** to verify changes (especially in monorepos/workspaces).

## When to use (triggers)
- You changed code but don't know the correct `test/build/lint/typecheck` commands.
- The repo uses workspaces (npm/pnpm/yarn) or multiple packages.
- CI runs a different set of commands than your local default.

## Inputs / Outputs
- Inputs: repo root, target package(s)/scope, CI command logs (if available).
- Outputs: a minimal verification command set (and the directories where to run them), plus evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Identify the failing/targeted area (package path, entry point, or changed files).
2) Diagnose
   - Detect package manager + workspace layout:
     - `pnpm-lock.yaml` => pnpm
     - `yarn.lock` => yarn
     - `package-lock.json` => npm
   - Find scripts:
     - Check repo root `package.json` for workspace-wide scripts.
     - Check package-level `package.json` for `test`, `build`, `lint`, `typecheck`.
   - If CI exists, treat CI as source of truth: mirror the job commands locally.
3) Fix
   - Run the narrowest possible command subset first (single package, single test file).
4) Verify
   - Run the full relevant gate set for the affected scope.
   - Record exact commands and working directories.

## Recommended verification sets
- Minimal (fast): `typecheck` + targeted tests.
- Standard: `lint` + `typecheck` + tests.
- Release-grade: `lint` + `typecheck` + tests + `build` (+ bundle/perf checks if relevant).

## Definition of Done
- Commands are unambiguous and reproducible (documented with directories).
- Verification passes for the affected scope (or failures are documented with next steps).
