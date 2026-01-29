---
name: docs-coauthoring
description: "Documentation co-authoring playbook. Use when co-authoring technical documentation (process docs, runbooks, specs, RFCs) in Markdown with structured context gathering and reader testing."
---

# docs-coauthoring (Playbook)

Use this when you want to write documentation that survives handoff: clear scope, clear audience, and minimal ambiguity.

## When to use (triggers)
- Writing IT process docs, server configuration docs, runbooks, or onboarding docs.
- Drafting technical specs/RFCs/decision docs.
- Editing messy docs into a maintainable structure.

## Inputs / Outputs
- Inputs: target audience, purpose, constraints, existing context (links/files), required template (if any).
- Outputs: a drafted Markdown doc + a review checklist + follow-up TODOs.

## Workflow (Context -> Structure -> Draft -> Reader test)
1) Context
   - Ask for: audience, goal, constraints, and “definition of done”.
   - Collect raw notes first; don’t optimize wording yet.
2) Structure
   - Propose a minimal table of contents.
   - Confirm what is explicitly *out of scope*.
3) Draft
   - Fill sections one by one.
   - Prefer concrete commands, file paths, and examples.
4) Reader test (critical)
   - Re-read the doc as if you know nothing.
   - Identify missing prerequisites, ambiguous steps, and hidden assumptions.

## Output rules (Codex-friendly)
- Prefer short sections and bullet checklists.
- Put commands in code fences and mention the working directory.
- Never paste secrets; document where secrets live and required permissions.

## Templates
- Generic doc template: `assets/doc-template.md`
- Reader test checklist: `references/reader-test-checklist.md`

## Definition of Done
- Doc has explicit audience, scope, and prerequisites.
- A reader can execute steps without unstated context.
- Commands and file paths are accurate and reproducible.

## Credits
- Inspired by structured co-authoring workflows from [anthropics/skills](https://github.com/anthropics/skills) (adapted for Codex + repo-local Markdown docs).
