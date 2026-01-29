---
name: ps-runtime-debug
description: "Playbook for ps-runtime-debug. Use when The bug is runtime-only: script throws, wrong output, incorrect branching, unexpected environment effects; you need a minimal repro and strong evidence before changing behavior; you need to debug compatibility issues across Windows PowerShell 5.1 vs PowerShell 7+."
---

# ps-runtime-debug (Playbook)

Use this for **runtime debugging** in PowerShell: unexpected output, runtime errors, environment-dependent behavior.

## When to use (triggers)
- The bug is runtime-only: script throws, wrong output, incorrect branching, unexpected environment effects.
- You need a minimal repro and strong evidence before changing behavior.
- You need to debug compatibility issues across Windows PowerShell 5.1 vs PowerShell 7+.

## Inputs / Outputs
- Inputs: repro steps, error output, PS version/OS, module paths, suspected area, verification commands.
- Outputs: root cause explanation, minimal fix, improved observability (optional), verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Create a minimal repro script or Pester test.
   - Reduce inputs and remove unrelated side effects.
2) Diagnose
   - Capture evidence:
     - Add targeted `Write-Verbose`/`Write-Debug` (avoid `Write-Host` for production behavior).
     - Use `$Error[0]`, `$PSVersionTable`, and strict error handling (`$ErrorActionPreference='Stop'`) in the repro.
   - If compatibility is suspected, verify behavior under each intended PS version.
3) Fix
   - Apply the smallest behavior change that addresses the root cause.
   - Keep debug output behind `-Verbose`/`-Debug` where possible.
4) Verify
   - Run the minimal repro and key smoke scenarios.
   - Run Pester if present.

## Definition of Done
- Repro is stable and documented.
- Root cause is explained with evidence.
- Fix is minimal and verified on intended PS versions/environments.
