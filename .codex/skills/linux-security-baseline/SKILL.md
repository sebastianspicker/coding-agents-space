---
name: linux-security-baseline
description: "Playbook for linux-security-baseline. Use when establishing a basic Linux server security posture (SSH, users/sudo, updates, firewall, file perms, secrets locations) without exploitation."
---

# linux-security-baseline (Playbook)

Use this to establish a pragmatic security baseline for Linux servers.

## When to use (triggers)
- You’re hardening a server before production use.
- You need to standardize user access and SSH policy.
- You need a “minimum acceptable” posture for audits.

## Inputs / Outputs
- Inputs: server role, threat assumptions, access model, compliance constraints.
- Outputs: baseline checklist + documented changes + verification steps.

## Step sequence (Assess -> Harden -> Verify -> Document)
1) Assess
   - Identify exposed services and admin access paths.
2) Harden
   - Apply checklist items below that fit the role.
3) Verify
   - Confirm access still works for intended admins.
   - Confirm services remain reachable as intended (no accidental lockout).
4) Document
   - Record decisions, exceptions, and how to rotate credentials.

## Baseline checklist (starter)
- SSH
  - disable password auth where possible (keys only)
  - restrict root login
  - use allowlists for users/groups
- Users/sudo
  - least privilege, no shared accounts
  - remove stale users and keys
- Updates
  - security updates policy (automatic or scheduled)
- Firewall
  - allow only needed ports
- Secrets
  - document secret storage locations (no plaintext in docs)

## Templates
- Baseline report: `assets/baseline-report.md`
- Checklist: `references/checklist.md`

## Definition of Done
- Baseline controls are applied or explicitly waived (with reason).
- Access is verified (no lockout) and services behave as intended.
- Documentation exists for ongoing maintenance and key rotation.
