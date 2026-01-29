---
name: repo-security-deps
description: "Playbook for repo-security-deps. Use when `npm audit` reports vulnerabilities; you need to update dependencies safely without breaking runtime behavior; you need a lockfile policy decision (commit lockfiles vs not)."
---

# repo-security-deps (Playbook)

Use this when you need to handle **dependency security and hygiene** (vulnerabilities, lockfiles, supply chain risk).

## When to use (triggers)
- `npm audit` reports vulnerabilities.
- You need to update dependencies safely without breaking runtime behavior.
- You need a lockfile policy decision (commit lockfiles vs not).

## Inputs / Outputs
- Inputs: vulnerability report, affected packages, constraints (no breaking changes, pinned versions), verification commands.
- Outputs: minimal dependency update PR, verification evidence, and documented risk acceptance if applicable.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Capture the report (`npm audit`, advisories) and the exact package graph involved.
2) Diagnose
   - Decide per vulnerability:
     - Is it reachable in production/runtime?
     - Is it dev-only tooling?
     - Is there a safe patch/minor bump, or would it require major upgrades?
3) Fix
   - Prefer safe updates:
     - Patch/minor bumps first.
     - Avoid `npm audit fix --force` unless you accept breaking changes explicitly.
   - Keep dependency changes isolated in their own PR where possible.
4) Verify
   - Run the package verification commands (build/tests).
   - Confirm the vulnerability status and document residual risk if any.

## Notes (this repo)
`npm install` currently creates `package-lock.json` files for the runtime skill packages. Decide whether lockfiles are desired for this repo.

## Definition of Done
- Dependency updates are minimal and justified.
- Verification passes.
- Remaining risk (if any) is documented.
