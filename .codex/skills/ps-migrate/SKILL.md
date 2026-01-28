# ps-migrate (Playbook)

Use this when you need to migrate PowerShell scripts/modules across command changes with minimal risk.

## When to use (triggers)
- Cmdlets need renaming (compat/security modernization).
- You want a mechanical transform and a verification gate.

## Inputs / Outputs
- Inputs: before/after command mapping, scope, verification commands.
- Outputs: patch set, verification evidence, follow-up notes for manual review.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: reproduce the break and capture baseline errors.
2) Diagnose: define a precise mapping (command + any constraints).
3) Fix: apply mechanical renames first; avoid mixing refactors.
4) Verify: smoke run key scripts; run Pester if available.

## Optional: use the runtime skill in this repo
`skills/dev-tools/ps1-optimize` supports `migrate.renameCommands` (boundary-aware token renames).

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    {
      "type": "migrate",
      "applyFixes": true,
      "migrate": { "renameCommands": [{ "from": "Get-WmiObject", "to": "Get-CimInstance" }] }
    }
  ]
}
```

## Notes / limitations
- Command renames are not semantic refactors; review call sites for parameter/behavior differences.

## Definition of Done
- Migration is mechanical and reviewable.
- Key entry points are smoke tested and any deeper changes are tracked separately.
