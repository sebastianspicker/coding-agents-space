---
name: openapi-codegen-workflow
description: "OpenAPI codegen workflow playbook. Use when generating SDKs/clients/servers from OpenAPI with deterministic builds, diff review, breaking-change detection, versioning, and publish discipline."
---

# openapi-codegen-workflow (Playbook)

Use this to run OpenAPI-based code generation safely: deterministic outputs, reviewable diffs, and compatibility gates.

## When to use (triggers)
- You want to generate a client SDK for TS/Python/etc from OpenAPI.
- You’re updating an OpenAPI spec and need to propagate changes safely.
- You need to publish a generated package and manage versioning.

## Inputs / Outputs
- Inputs: OpenAPI spec location, generator choice, target language, package name/versioning, consumer list.
- Outputs: pinned generation config + generated code diff + breaking change assessment + publish checklist.

## Step sequence (Pin -> Generate -> Review -> Test -> Release)
1) Pin
   - Pin generator version and inputs (spec revision).
2) Generate
   - Generate deterministically into a designated directory.
3) Review
   - Review diff; avoid manual edits to generated files (use templates/hooks).
4) Test
   - Run contract/serialization tests against fixtures.
5) Release
   - Version appropriately; publish with changelog notes.

## Determinism rules
- No “generated at <timestamp>” diffs; disable or normalize where possible.
- Keep generator config checked in.
- Prefer formatting as a separate, stable step.

## Templates
- Generation config template: `assets/generate-config.md`
- Publish checklist: `assets/publish-checklist.md`
- Review checklist: `references/review.md`

## Definition of Done
- Generator/spec inputs are pinned and recorded.
- Generated diff is reviewed and tests pass.
- Versioning/publish notes are updated.

## Related skills
- `api-contracts` for spec-first changes and compatibility.
- `ts-codegen` for repo-local deterministic codegen patterns.

