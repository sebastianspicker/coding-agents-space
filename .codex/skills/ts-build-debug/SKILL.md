---
name: ts-build-debug
description: "Playbook for ts-build-debug. Use when `tsc` errors that differ from bundler output; ESM/CJS mismatch issues (`ERR_REQUIRE_ESM`, default import weirdness); Path alias resolution breaks (`paths`, `baseUrl`), NodeNext quirks."
---

# ts-build-debug (Playbook)

Use this when TS/JS **builds** fail or behave unexpectedly: tsconfig issues, ESM/CJS, moduleResolution, path aliases.

## When to use (triggers)
- `tsc` errors that differ from bundler output.
- ESM/CJS mismatch issues (`ERR_REQUIRE_ESM`, default import weirdness).
- Path alias resolution breaks (`paths`, `baseUrl`), NodeNext quirks.

## Inputs / Outputs
- Inputs: error logs, `tsconfig.json`, Node version, package `type` (module/commonjs), bundler config (if any).
- Outputs: minimal fix (config/code), explanation, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Capture the exact failing command (`npm run build`, `tsc -p ...`, bundler build).
2) Diagnose
   - Determine which tool is the source of truth: `tsc` vs bundler vs runtime.
   - Check common mismatch points:
     - `module` + `moduleResolution` (e.g., `NodeNext`)
     - `type: module` vs `commonjs`
     - `exports` field and conditional exports
     - `paths/baseUrl` usage and runtime resolution
     - generated `.d.ts` locations and `rootDir/outDir`
3) Fix
   - Make the smallest change that restores consistent resolution/emit.
   - Avoid broad refactors while fixing build toolchain issues.
4) Verify
   - Re-run build + typecheck + tests.
   - If runtime is involved, do a smoke run.

## Definition of Done
- Build/typecheck behavior is consistent and explained.
- Fix is minimal and verified.
