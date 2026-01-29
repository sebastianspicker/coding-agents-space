---
name: api-contracts
description: "API contracts playbook. Use when defining or changing HTTP/JSON APIs with OpenAPI/JSON Schema, enforcing compatibility, adding contract tests, and versioning safely across clients and services."
---

# api-contracts (Playbook)

Use this to treat API schemas as a source of truth: define, version, validate, and test compatibility so changes don’t surprise consumers.

## When to use (triggers)
- Adding a new API endpoint or event payload.
- Changing request/response shapes (renames, new fields, enum changes).
- Multiple clients (web/mobile/CLI) rely on the same API.
- You want contract tests or schema validation in CI.

## Inputs / Outputs
- Inputs: current API behavior, consumers, desired change, existing schemas (OpenAPI/JSON Schema), versioning policy.
- Outputs: updated schemas + compatibility assessment + contract tests plan + verification commands.

## Step sequence (Inventory -> Specify -> Compatibility -> Tests -> Rollout)
1) Inventory
   - Identify all consumers (apps, services, scripts).
   - Capture real example payloads (golden fixtures) for old and new behavior.
2) Specify
   - Choose your primary contract format:
     - OpenAPI for HTTP APIs
     - JSON Schema for payloads/events
   - Make the schema explicit (types, required/optional, enums, constraints).
3) Compatibility (assume conservative defaults)
   - “Additive” changes are safest (new optional fields).
   - Breaking changes require a versioned rollout plan.
4) Tests
   - Validate fixtures against schemas.
   - Add contract tests at the boundary (HTTP handler/client, serializer/deserializer).
5) Rollout
   - Deploy schema and code changes with backward compatibility.
   - Remove deprecated fields only after all consumers migrate.

## Compatibility checklist (HTTP + JSON)
- Adding a field:
  - Prefer optional with a default behavior (server-side).
  - Don’t change meaning of existing fields.
- Removing/renaming a field:
  - Treat as breaking; deprecate first.
- Tightening constraints (min/max/regex/enum):
  - Treat as breaking unless you prove existing payloads conform.
- Changing types (string -> number, etc.):
  - Breaking.
- Enum changes:
  - Adding values can break strict clients; plan for unknown values on clients.

## Contract test ideas (boundary-first)
- Server validates responses against schema (at least in tests).
- Client validates responses (in tests) and handles unknown fields/enum values safely.
- Fixtures:
  - “old-but-valid” payloads still pass after change (if backward-compatible).
  - “new-valid” payloads pass.
  - Known-invalid payloads fail with clear errors.

## Templates
- OpenAPI skeleton: `assets/openapi.skeleton.yaml`
- JSON Schema skeleton: `assets/jsonschema.skeleton.json`
- Contract change checklist: `assets/contract-change-checklist.md`
- Contract fixtures folder conventions: `references/fixtures-layout.md`

## Definition of Done
- Schema(s) are updated and reviewed.
- Compatibility impact is explicitly stated (compatible / breaking + rollout plan).
- Fixtures validate, and contract tests run in CI (or are explicitly deferred with a reason).

## Related skills
- `repo-contracts` for shared schema/contract discipline in this repo.
- `reverse-spec` for turning observed behavior into a contract.

## Credits
- Written as a repo-first playbook; aligns with common schema-driven API design and compatibility practices.

