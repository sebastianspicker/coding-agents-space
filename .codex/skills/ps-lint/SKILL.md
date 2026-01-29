---
name: ps-lint
description: "Playbook for ps-lint. Use when Formatting/whitespace issues create noisy diffs or CI failures; you want to remove unsafe patterns (e.g., Write-Host usage) via findings + follow-up."
---

# ps-lint (Playbook)

Use this when you need deterministic linting improvements in PowerShell scripts/modules without changing behavior.

## When to use (triggers)
- Formatting/whitespace issues create noisy diffs or CI failures.
- You want to remove unsafe patterns (e.g., Write-Host usage) via findings + follow-up.

## Inputs / Outputs
- Inputs: repo path + scope, lint rules, expected output conventions.
- Outputs: patches, lint passing (or documented exceptions), verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: run lint and capture failing files/rules.
2) Diagnose: separate auto-fixable hygiene from behavioral changes.
3) Fix: apply deterministic edits in small batches.
4) Verify: rerun lint + smoke tests (and Pester if present).

## Optional: use the runtime skill in this repo
`skills/dev-tools/ps1-optimize` supports `lint` rules:
- `trim-trailing-whitespace` (auto-fixable)
- `final-newline` (auto-fixable)
- `no-write-host` (findings only)

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    { "type": "lint", "applyFixes": true, "lintRules": ["trim-trailing-whitespace", "final-newline"], "targets": { "paths": ["scripts"] } }
  ]
}
```

## Definition of Done
- Lint is green for the chosen scope.
- Diffs are mechanical and minimal.
- Verification commands are recorded and re-runnable.
