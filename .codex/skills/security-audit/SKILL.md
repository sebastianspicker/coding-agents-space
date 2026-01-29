---
name: security-audit
description: "Playbook for security-audit. Use when auditing code, dependencies, and configuration for security issues (app + infra) and producing an actionable findings report."
---

# security-audit (Playbook)

Use this for **authorized** security reviews of applications and infrastructure-as-code.

## When to use (triggers)
- You need a security audit / threat model / vulnerability review.
- You want dependency/secrets scanning and a prioritized remediation plan.
- You’re preparing to ship a security-sensitive feature (auth, payments, file upload).

## Inputs / Outputs
- Inputs: scope (repos/paths), threat model assumptions, environment (prod/staging), constraints (no active exploitation).
- Outputs: findings report with severity, evidence, remediation, and verification steps.

## Step sequence (Scope -> Scan -> Manual review -> Report -> Verify)
1) Scope
   - Confirm authorization and boundaries (what is in-scope vs out-of-scope).
   - Identify critical assets and trust boundaries.
2) Scan (non-invasive first)
   - Dependency audit (npm/pip/etc.) if the repo uses it.
   - Secrets scan (look for keys/tokens/certs).
   - Basic config review (Dockerfile, CI, infra).
3) Manual review (highest ROI areas)
   - AuthN/AuthZ paths
   - Input validation and output encoding
   - SSRF/file upload/deserialization hotspots
   - Logging of sensitive data
4) Report
   - Use the report template; include precise locations and reproduction steps.
5) Verify
   - For each fix, verify the issue is closed and no regressions are introduced.

## Severity rubric (simple)
- Critical: remote exploit / auth bypass / data exfil likely
- High: serious vuln with plausible exploit
- Medium: requires preconditions; still meaningful
- Low: best practice / hardening

## What this playbook does NOT do
- No exploitation beyond minimal proof in a safe environment.
- No testing outside the explicitly authorized scope.
- No production testing unless explicitly authorized and planned.

## Suggested tooling (run only if applicable)
- Dependency audit:
  - Node: `npm audit` (or the repo’s package manager equivalent)
  - Python: `pip-audit` / `uv pip audit` (if installed) or lockfile review
- Secrets scan:
  - `gitleaks` / `trufflehog` (if installed) or targeted searches for token formats
- IaC/container:
  - `trivy` / `checkov` (if installed) or manual review of Dockerfiles and CI

## Templates
- Findings report template: `assets/report-template.md`
- Review checklist: `references/checklist.md`

## Definition of Done
- Scope and authorization are explicit.
- Findings include evidence, severity, and actionable remediation.
- Fixes (if implemented) are verified and documented.

## Related skills
- `web-security-audit` for browser-specific concerns.
- `secure-implement` when implementing remediations.

## Credits
- Inspired by [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (audit flow + reporting; rewritten to be lightweight and repo-first).
