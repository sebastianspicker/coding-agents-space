---
name: ps-codegen
description: "Playbook for ps-codegen. Use when you want an `index.psm1` that dot-sources scripts in a directory; you want to reduce manual module index maintenance."
---

# ps-codegen (Playbook)

Use this when you need deterministic code generation for PowerShell modules (index.psm1, export surfaces).

## When to use (triggers)
- You want an `index.psm1` that dot-sources scripts in a directory.
- You want to reduce manual module index maintenance.

## Inputs / Outputs
- Inputs: target directories, desired module structure, constraints (deterministic ordering, no hidden exports).
- Outputs: generated index file(s), verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: run codegen on one directory first.
2) Diagnose: ensure generated module surface is correct.
3) Fix: apply generation; keep diffs isolated to generated files.
4) Verify: import module and smoke run key functions (and run Pester if present).

## Optional: use the runtime skill in this repo
`skills/dev-tools/ps1-optimize` supports `codegen.kind=module` to generate `index.psm1` with dot-sourcing.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "codegen", "applyFixes": true, "codegen": { "kind": "module", "targetDirs": ["src"] } }]
}
```

## Definition of Done
- Generated output is deterministic and reviewed.
- Module can be imported and basic smoke checks pass.
