# repo-new-runtime-skill (Playbook)

Use this when you want to add a **new runtime skill package** under `skills/<domain>/<skill>/` without breaking the repo conventions.

## When to use (triggers)
- You are adding a new skill (new domain or new capability).
- You want a reproducible template for manifests/schemas/sandbox/tests.
- You need to wire the skill into agent tooling (tool definitions) and docs.

## Inputs / Outputs
- Inputs: skill id/name, domain, short description, sandbox needs, input/output contract shape, test strategy.
- Outputs: a new skill directory with manifest + schemas + sandbox + README + tests, plus repo navigation updates.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Clarify the problem the skill solves and the minimal set of actions it must support.
2) Diagnose
   - Define the input schema and output schema up front (contracts first).
   - Decide sandbox permissions early (filesystem, network).
3) Fix (scaffold + implement)
   - Create the directory `skills/<domain>/<skill>/` with the standard files:
     - `manifest.yaml`
     - `schemas/input.schema.json`
     - `schemas/output.schema.json`
     - `sandbox/Dockerfile`
     - `sandbox/permissions.yaml`
     - `README.md`
     - `tests/unit/*` and/or `tests/golden/*`
     - `package.json` (if Node-based) + `tsconfig.json`
4) Verify
   - Build + run tests for the new package.
   - Run at least one end-to-end invocation in the sandbox (Docker) using an `examples/input.*.json`.

## Template reference (this repo)
- Runtime skill template checklist: `docs/skill-template.md`
- Shared schema contracts: `contracts/*.schema.json`

## Minimal checklist for a new Node-based skill
- `package.json` scripts:
  - `build`: compile to `dist/`
  - `test`: run unit/golden tests
- Strict schema validation:
  - Input schema: `additionalProperties: false`, required fields explicit.
  - Output schema: stable `RunResult` format; patch-first semantics if you emit patches.
- Sandbox:
  - Default to no-network.
  - Only allow filesystem writes when a user explicitly opts in (e.g. `applyFixes=true`).

## Wiring / navigation (what to update)
- Add human docs:
  - `README.md` (root) and/or `agents/<domain>/README.md`
- If exposed as a tool:
  - Update `agent-config/tool-definitions/tools.generated.json`
  - See `.codex/skills/repo-tool-definitions/SKILL.md`

## Verification commands (repo-local)
- For a Node-based skill:
  - `npm install`
  - `npm run build`
  - `npm test`

## Definition of Done
- New skill directory matches the template and is self-contained.
- Schemas, README, and implementation agree.
- Tests pass and at least one sandbox run is reproducible.
