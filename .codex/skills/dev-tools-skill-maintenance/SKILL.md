---
name: dev-tools-skill-maintenance
description: "Playbook for dev-tools-skill-maintenance. Use when you change `src/` behavior, add a new rule, or add/modify an action type; you touch `schemas/*.schema.json`, `manifest.yaml`, `sandbox/*`, or `tests/*`; A downstream agent/tool expects stable I/O contracts and you must avoid breaking changes."
---

# dev-tools-skill-maintenance (Playbook)

Use this when you change the **runtime skill packages** under `skills/dev-tools/*` (schemas, behavior, output shape, sandbox, tests).

## When to use (triggers)
- You change `src/` behavior, add a new rule, or add/modify an action type.
- You touch `schemas/*.schema.json`, `manifest.yaml`, `sandbox/*`, or `tests/*`.
- A downstream agent/tool expects stable I/O contracts and you must avoid breaking changes.

## Inputs / Outputs
- Inputs: change request (bugfix/feature), target runtime skill (`ts-optimize` or `ps1-optimize`), expected contract changes (if any).
- Outputs: code changes + updated schemas/docs/tests + verification evidence + documented compatibility notes.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Reproduce the issue or define the new behavior with a minimal fixture.
   - If possible, add/extend a unit test first.
2) Diagnose
   - Identify whether the change affects: input schema, output schema, patch format, sandbox permissions, or performance limits.
3) Fix
   - Keep behavior conservative and deterministic.
   - Update schemas and examples together with code changes.
4) Verify
   - Run unit tests and build.
   - If behavior/output changes: update examples/expected outputs and re-check docs.

## Rules (avoid breaking runtime skills)
- Do not rename/move: `manifest.yaml`, `schemas/`, `sandbox/`, `src/` without strong reason.
- Prefer additive schema changes (new optional fields) over breaking renames.
- Keep “patch-first” semantics: emit patches; only write when `applyFixes=true`.
- Respect the hard safety boundary: sandbox paths must stay under `/workspace`.

## Contract touchpoints (what to update)
- Runtime skill:
  - `skills/dev-tools/*/schemas/input.schema.json`
  - `skills/dev-tools/*/schemas/output.schema.json`
  - `skills/dev-tools/*/README.md` (document new action/rule, limitations, safety)
  - `skills/dev-tools/*/examples/*` (minimal inputs)
  - `skills/dev-tools/*/tests/unit/*` (add/adjust tests)
- Shared contracts (only if you are changing the shared format):
  - `contracts/*schema.json`
- Tool definitions:
  - `agent-config/tool-definitions/tools.generated.json` if schema refs or tool wiring changes

## Verification (this repo)
### ts-optimize
```bash
cd skills/dev-tools/ts-optimize
npm install
npm run build
npm test
```

### ps1-optimize
```bash
cd skills/dev-tools/ps1-optimize
npm install
npm run build
npm test
```

## Definition of Done
- Tests cover the new behavior or the bugfix.
- Schemas and docs match the implementation.
- No unintended filesystem writes happen (unless `applyFixes=true`).
- Output stays stable (or changes are explicitly documented and versioned).
