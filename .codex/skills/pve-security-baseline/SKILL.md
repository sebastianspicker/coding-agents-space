---
name: pve-security-baseline
description: "Proxmox VE security baseline playbook. Use when hardening PVE access (admins, realms, MFA, API tokens), firewall defaults, update cadence, secrets handling, and basic audit practices without offensive guidance."
---

# pve-security-baseline (Playbook)

Use this to establish a pragmatic security baseline for Proxmox VE nodes/clusters.

## When to use (triggers)
- Standing up a new PVE cluster.
- After a security audit or before exposing management access broadly.
- Standardizing admin access, MFA, tokens, and firewall posture.

## Inputs / Outputs
- Inputs: access model (local/LDAP/realm), admin roster, network exposure, backup posture, update policy.
- Outputs: baseline report + prioritized remediation + exception records.

## Step sequence (Inventory -> Baseline -> Apply -> Verify -> Exceptions)
1) Inventory
   - Who has access, how, from where; what networks can reach the UI/API/SSH.
2) Baseline
   - Define required controls (MFA, least privilege, tokens, firewall posture).
3) Apply
   - Apply changes in small steps; verify access after each change.
4) Verify
   - Confirm admin access works for intended users and is blocked otherwise.
5) Exceptions
   - Document any deviations (owner/expiry/compensating controls).

## Baseline checklist (starter)
- Access
  - Unique admin identities (no shared logins).
  - MFA enabled where possible.
  - API tokens used for automation, scoped and rotated.
- Network exposure
  - Management UI/API only reachable from admin networks/VPN.
  - Firewall default-deny inbound where feasible.
- Updates
  - Update cadence defined; emergency patch path defined.
- Secrets
  - SSH keys/tokens stored in approved locations; rotation process documented.
- Audit
  - Logs retained long enough for incident analysis; sensitive data minimized.

## Templates
- Baseline report: `assets/baseline-report.md`
- Exception template: `references/exception-template.md`

## Definition of Done
- Baseline applied to at least one node/cluster scope with verification evidence.
- Exceptions are tracked with owner/expiry.
- Follow-ups filed for remaining gaps.

