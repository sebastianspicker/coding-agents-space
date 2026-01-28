# ps-diagnostics (Playbook)

Use this when you need PowerShell diagnostics that depend on the environment (pwsh + PSScriptAnalyzer).

## When to use (triggers)
- Diagnostics are missing or inconsistent between machines/CI.
- The runtime skill logs "pwsh not available" or "PSScriptAnalyzer not available".
- You need to understand what can be analyzed and what will be skipped.

## Inputs / Outputs
- Inputs: target project path, expected PowerShell version, module paths, error logs.
- Outputs: environment diagnosis, consistent diagnostic run, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: run diagnostics and capture logs/output.
2) Diagnose: confirm `pwsh` availability, version, and whether PSScriptAnalyzer is installed.
3) Fix: adjust environment (module paths, tooling) or fall back to best-effort checks.
4) Verify: re-run diagnostics and ensure stable output for the same inputs.

## Optional: use the runtime skill in this repo
`skills/dev-tools/ps1-optimize` runs PSScriptAnalyzer if available and logs graceful degradation otherwise.
See `.codex/skills/ps1-optimize/SKILL.md`.

## Definition of Done
- It is clear which diagnostics run and which are skipped (with reasons).
- The same inputs produce stable output on the chosen environment.
