# ps-module (Playbook)

Use this when you need to build or maintain PowerShell modules with clean packaging hygiene.

## When to use (triggers)
- Module export surface is unclear (unexpected functions exported).
- You need deterministic module entry points (psm1/psd1 structure).
- Compatibility issues between Windows PowerShell 5.1 and PowerShell 7+.

## Inputs / Outputs
- Inputs: module layout, intended exports, manifest requirements, target PS versions.
- Outputs: cleaned module structure, explicit exports, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: import the module and confirm actual exports vs intended exports.
2) Diagnose: identify how exports are defined (implicit dot-sourcing vs explicit Export-ModuleMember).
3) Fix: make exports explicit; keep module entry points deterministic.
4) Verify: import module in target PS versions (where relevant) and smoke run core functions; run tests if present.

## Optional: use the runtime skill in this repo
`ps1-optimize` can generate `index.psm1` deterministically from folders (dot-sourcing).
See `.codex/skills/ps1-optimize/SKILL.md` and `.codex/skills/ps-codegen/SKILL.md`.

## Definition of Done
- Export surface is explicit and matches intended public API.
- Module import/smoke tests pass.
- Changes are minimal and documented.
