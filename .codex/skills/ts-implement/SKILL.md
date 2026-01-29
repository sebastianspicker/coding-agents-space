---
name: ts-implement
description: "Playbook for ts-implement. Use when you are implementing a new feature, endpoint, UI behavior, or library change in TS/JS; you need a bugfix that must land with a regression test; you need a small, safe, “patch-first” change plan rather than a refactor spree."
---

# ts-implement (Playbook)

Use this when you need to **write TypeScript/JavaScript code** (feature work or bugfix) with a clean, reviewable path to verification.

## When to use (triggers)
- You are implementing a new feature, endpoint, UI behavior, or library change in TS/JS.
- You need a bugfix that must land with a regression test.
- You need a small, safe, “patch-first” change plan rather than a refactor spree.

## Inputs / Outputs
- Inputs: requirements (expected vs actual), scope boundaries, target repo path, constraints (API compatibility, performance), verification commands.
- Outputs: minimal patch set, tests (or documented verification), and a short rationale.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro (baseline)
   - Reproduce the issue or define a tiny acceptance test (even as a script snippet).
   - Run the repo’s baseline checks (typecheck/test/build if present).
2) Diagnose (design)
   - Identify the smallest seam to change and list invariants.
   - Decide what needs a test vs what can be covered by existing tests.
3) Fix (implementation)
   - Implement in small commits/patches:
     - Add/adjust types and interfaces first.
     - Implement behavior with the smallest surface change.
     - Add a regression test (preferred: red -> green).
4) Verify
   - Run: tests + typecheck + build (or repo-specific equivalents).
   - Re-run the repro scenario and confirm no new warnings/errors.

## Verification (generic)
Derive commands from the target repo:
- Prefer the package manager indicated by a lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).
- Run the closest scripts: `test`, `typecheck`, `lint`, `build`.
- If scripts are missing, fall back to: `npx tsc -p tsconfig.json` and the repo’s test runner docs.

## Optional: runtime skill usage (this repo)
- Use `.codex/skills/ts-optimize/SKILL.md` for `lint/migrate/codegen/recommend` recipes.
- Use `.codex/skills/dev-tools-patches/SKILL.md` to apply patch-first outputs safely.

## Definition of Done
- Scope is explicit and small.
- Code change is minimal and readable.
- A regression test exists for bugfixes (or a clear reason why not).
- Verification is recorded and passes.
