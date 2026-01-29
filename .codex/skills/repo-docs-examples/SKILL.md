---
name: repo-docs-examples
description: "Playbook for repo-docs-examples. Use when you changed a schema, action, or output shape and need docs updated; you added/updated `examples/input.*.json` or `expected-output` fixtures; you reorganized documentation and need links/navigation to remain correct."
---

# repo-docs-examples (Playbook)

Use this when you update docs/examples and need them to stay consistent with runtime behavior and contracts.

## When to use (triggers)
- You changed a schema, action, or output shape and need docs updated.
- You added/updated `examples/input.*.json` or `expected-output` fixtures.
- You reorganized documentation and need links/navigation to remain correct.

## Inputs / Outputs
- Inputs: target docs/files, change summary, affected runtime skills/contracts, verification commands.
- Outputs: updated docs/examples, link integrity, and verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Identify the authoritative sources (schemas, runtime behavior, tests).
2) Diagnose
   - Find mismatches:
     - docs vs schemas
     - examples vs schemas
     - expected outputs vs runtime output shape
     - broken links/navigation
3) Fix
   - Update docs and examples together with code changes.
   - Prefer minimal examples that demonstrate one capability at a time.
4) Verify
   - Run unit tests for affected runtime skills.
   - Check links in the main navigation docs.

## Verification (this repo)
- Runtime skills:
  - `cd skills/dev-tools/ts-optimize && npm install && npm run build && npm test`
  - `cd skills/dev-tools/ps1-optimize && npm install && npm run build && npm test`
- Links (suggested): run a simple markdown link check over `README.md`, `AGENTS.md`, `.codex/skills/README.md`, and `agents/dev-tools/README.md`.

## Definition of Done
- Docs/examples match schemas and implementation.
- Links/navigation remain valid.
- Verification passes and is reproducible.
