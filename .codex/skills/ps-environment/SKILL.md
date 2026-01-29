---
name: ps-environment
description: "Playbook for ps-environment. Use when Scripts work locally but fail in CI or on another machine; `pwsh` vs Windows PowerShell 5.1 differences matter; Module import/lookup issues (PSModulePath), execution policy, or signing blocks execution."
---

# ps-environment (Playbook)

Use this when PowerShell behavior depends on environment: PS version, ExecutionPolicy, profiles, module paths, signing.

## When to use (triggers)
- Scripts work locally but fail in CI or on another machine.
- `pwsh` vs Windows PowerShell 5.1 differences matter.
- Module import/lookup issues (PSModulePath), execution policy, or signing blocks execution.

## Inputs / Outputs
- Inputs: OS, PS version(s), error output, module paths, execution policy, repo layout.
- Outputs: environment diagnosis, minimal fix (script/config/docs), verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Capture `$PSVersionTable`, `$env:PSModulePath`, execution policy, and the failing command.
2) Diagnose
   - Identify the dependency:
     - requires PS7 features?
     - relies on profile state?
     - module path assumptions?
     - signing/execution policy constraints?
3) Fix
   - Prefer making scripts self-contained:
     - avoid profile dependencies
     - explicit module loading
     - clear error messages when prerequisites are missing
4) Verify
   - Verify on the intended PS versions/environments (at least one clean environment).

## Definition of Done
- Environment dependency is identified and documented.
- Fix is minimal and improves portability.
- Verification passes on intended targets.
