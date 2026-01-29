---
name: py-codegen
description: "Python code generation playbook. Use when generating Python code (clients, stubs, schemas) deterministically with review gates, minimal manual edits, and tests that validate generated behavior."
---

# py-codegen (Playbook)

Use this to keep Python code generation safe: deterministic outputs, reviewable diffs, and verification.

## When to use (triggers)
- Generating clients/models from schemas/specs.
- Generating stubs/types or boilerplate repeatedly.
- Refactoring codegen outputs without breaking consumers.

## Inputs / Outputs
- Inputs: source schema/spec, generator/tooling, output directory, formatting/lint policy.
- Outputs: codegen config + generated diff + verification commands/results.

## Step sequence (Define -> Generate -> Review -> Verify -> Lock)
1) Define
   - Define inputs and outputs; pin versions.
2) Generate
   - Generate into a dedicated directory; avoid in-place manual edits.
3) Review
   - Review diff; keep generator changes separate from business logic changes.
4) Verify
   - Run tests/typing/lint relevant to generated outputs.
5) Lock
   - Document how to regenerate and when.

## Templates
- Regeneration notes: `assets/regenerate.md`
- Review checklist: `references/review.md`

## Definition of Done
- Regeneration command is documented and deterministic.
- Generated changes are reviewed and verified.

