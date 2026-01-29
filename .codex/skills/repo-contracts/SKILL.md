---
name: repo-contracts
description: "Playbook for repo-contracts. Use when you change any `contracts/*.schema.json`; you want to introduce a new field used by multiple runtime skills; you need to make a compatibility decision (additive vs breaking)."
---

# repo-contracts (Playbook)

Use this when you change **shared contracts** under `contracts/` (schemas for manifests, run-results, permissions, tool definitions).

## When to use (triggers)
- You change any `contracts/*.schema.json`.
- You want to introduce a new field used by multiple runtime skills.
- You need to make a compatibility decision (additive vs breaking).

## Inputs / Outputs
- Inputs: desired contract change, backward-compat constraints, any external consumers that parse these schemas.
- Outputs: updated schema(s), updated docs, and verification evidence (including compatibility notes).

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Identify who consumes the contract (runtime skills, runner, CI tooling, external repos).
   - Gather example payloads that should validate against the schema (both old and new).
2) Diagnose
   - Decide whether the change is additive (safe) or breaking.
   - Check whether `additionalProperties` constraints and required fields will reject existing payloads.
3) Fix
   - Prefer additive changes: new optional fields with defaults explained in docs.
   - If breaking is required, document it explicitly and coordinate versioning with consumers.
4) Verify
   - Validate example payloads against the schema(s) (old + new).
   - Re-run runtime skill tests if the change affects their output/input contracts.

## Rules of thumb (compatibility)
- Additive: new optional fields, new enum values only if consumers tolerate them, loosening constraints.
- Breaking: renaming/removing fields, tightening constraints, changing required fields, changing the meaning of existing fields.

## Where to update
- Contracts:
  - `contracts/skill-manifest.schema.json`
  - `contracts/tool-definition.schema.json`
  - `contracts/run-result.schema.json`
  - `contracts/permissions.schema.json`
- Runtime skills (if they embed expectations):
  - `skills/**/schemas/*.schema.json`
  - `skills/**/src/**`
  - `skills/**/README.md`
- Agent wiring:
  - `agent-config/**` (if the runner uses it)

## Verification commands (repo-local)
There is no dedicated schema validation script in this repo today. Practical minimum:
- For any runtime skill you affected:
  - `cd skills/dev-tools/ts-optimize && npm install && npm run build && npm test`
  - `cd skills/dev-tools/ps1-optimize && npm install && npm run build && npm test`
- Ensure schemas remain valid JSON and follow Draft 2020-12 conventions.

## Definition of Done
- Schema changes are documented with compatibility impact.
- Example payloads validate (or failures are intentional and documented).
- Runtime skill tests pass for affected packages.
