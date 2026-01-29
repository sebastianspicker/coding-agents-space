---
name: ts-migrate
description: "Playbook for ts-migrate. Use when Library upgrade requires import/API renames; you need a consistent change across many files; you want deterministic transforms with verification gates."
---

# ts-migrate (Playbook)

Use this when you need to migrate a TypeScript/JavaScript codebase across API changes with minimal risk.

## When to use (triggers)
- Library upgrade requires import/API renames.
- You need a consistent change across many files.
- You want deterministic transforms with verification gates.

## Inputs / Outputs
- Inputs: migration goal, before/after API mapping, scope, verification commands.
- Outputs: mechanical patch set, verification evidence, rollback plan (if needed).

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: reproduce the break (type errors/tests) on a clean baseline.
2) Diagnose: write a migration map (what changes, where, and why).
3) Fix: apply the smallest mechanical transforms first; avoid mixing refactors.
4) Verify: run typecheck + tests; re-run the same failure scenario.

## Optional: use the runtime skill in this repo
`skills/dev-tools/ts-optimize` supports `migrate.renameImports` for named import renames (and module specifier changes).

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    {
      "type": "migrate",
      "applyFixes": true,
      "migrate": {
        "renameImports": [
          { "from": { "module": "old-lib", "name": "foo" }, "to": { "module": "new-lib", "name": "fooNew" } }
        ]
      },
      "targets": { "paths": ["src"] }
    }
  ]
}
```

## Notes / limitations
- This runtime skill currently targets named import renames; deeper codemods should use repo-native tooling (jscodeshift/ts-morph scripts).
- Keep migrations and behavior changes separate where possible.

## Definition of Done
- Migration is mechanical and reviewable.
- Typecheck/tests pass.
- Any follow-up cleanups are tracked separately.
