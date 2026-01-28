# repo-tool-definitions (Playbook)

Use this when you need to define or update **tool definitions** for an agent runner (what tools exist, their names, and their input schemas).

## When to use (triggers)
- You add or change a runtime skill schema under `skills/**/schemas/input.schema.json`.
- You rename a runtime skill or want a new tool name exposed to agents.
- You need to validate that tool definitions point at the correct schemas.

## Inputs / Outputs
- Inputs: desired tool name(s), target runtime skill(s), the intended input schema path(s), and the runner's expectations.
- Outputs: updated tool-definition JSON (and optionally docs explaining the wiring) plus verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Identify the consumer: where does your runner read tool definitions from?
   - In this repo, the current tool-definition artifact is `agent-config/tool-definitions/tools.generated.json`.
2) Diagnose
   - Validate schema references resolve from the consumer's working directory (relative `$ref` paths matter).
   - Confirm the tool name matches what the runner expects (snake_case vs kebab-case, namespace conventions).
   - Confirm the schema is Draft 2020-12 compatible and has `additionalProperties: false` where desired.
3) Fix
   - Update `agent-config/tool-definitions/tools.generated.json` to include the tool(s) and correct `$ref` paths.
   - Keep changes additive when possible (new tools alongside old ones).
4) Verify
   - Verify that each `$ref` resolves to an existing schema file from the intended base directory.
   - If a runner exists, load the definitions and run one end-to-end invocation.

## Current state in this repo (important)
- `agent-config/tool-definitions/tools.generated.json` exists but is not referenced elsewhere in this repo.
  If you have an external runner that consumes it, treat that runner as the source of truth for path resolution.
- This repo also documents `$ref` resolution expectations in `agent-config/tool-definitions/README.md`.

## Recommended conventions
- Tool names: include a domain prefix (e.g. `dev_tools_ts_optimize`) to avoid collisions.
- Tool description: one sentence describing capabilities and safety (patch-first, applyFixes).
- Schema refs: prefer repo-root-relative references if the consumer supports it; otherwise document the expected base path.

## Verification commands (repo-local)
There is no built-in generator in this repo today. Minimum verification:
- Ensure `agent-config/tool-definitions/tools.generated.json` is valid JSON.
- Ensure each referenced schema path exists.

## Definition of Done
- Tool definitions are updated and consistent with runtime schemas.
- Schema references resolve correctly in the intended consumer environment.
- A minimal invocation path is documented and reproducible.
