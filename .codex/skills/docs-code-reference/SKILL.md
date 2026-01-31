---
name: docs-code-reference
description: "Playbook for docs-code-reference. Use when creating code-facing documentation (docstrings, API docs, OpenAPI/AsyncAPI, docs sites) with accurate examples and verification."
---

# docs-code-reference (Playbook)

Use this when documenting code so that it’s accurate, testable, and maintainable.

## When to use (triggers)
- Adding docstrings/JSDoc for public APIs.
- Writing/maintaining OpenAPI specs or API reference docs.
- Creating docs sites (MkDocs/Docusaurus/VitePress) in a repo that already uses one.
- Documenting APIs and contracts in a way that matches runtime behavior.

## Inputs / Outputs
- Inputs: language/framework, existing doc conventions, where docs live, what must be documented, example requests/responses.
- Outputs: doc changes (Markdown/specs/docstrings) + verification commands.

## Step sequence (Discover -> Draft -> Validate -> Verify)
1) Discover
   - Identify the doc target(s): public functions, endpoints, config files.
   - Match existing conventions (don’t introduce new doc tooling unless requested).
2) Draft
   - Document intent, inputs, outputs, error cases.
   - Prefer examples that can be executed (curl, node, python).
3) Validate
   - Ensure examples match actual code paths.
   - Ensure schema/spec is consistent (types, required fields).
4) Verify
   - Run existing doc builds/tests if configured.
   - Run a smoke test of examples where feasible.

## Common pitfalls
- Docs describing “future behavior” instead of current behavior.
- Examples that don’t run.
- Specs drifting from code (status codes, field names, auth requirements).

## Templates
- API doc page template: `assets/api-doc-template.md`
- Doc review checklist: `references/doc-review-checklist.md`

## Definition of Done
- Docs are consistent with code and cover key error cases.
- Examples are runnable or clearly marked as pseudocode.
- Any doc build/lint checks configured in the repo pass.

## Credits
- Inspired by documentation workflows from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (adapted into a repo-first, verification-first playbook).
