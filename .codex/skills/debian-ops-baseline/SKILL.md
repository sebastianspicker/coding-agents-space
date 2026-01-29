---
name: debian-ops-baseline
description: "Debian operations baseline playbook. Use when bringing Debian servers to an ops-ready baseline (apt sources, unattended upgrades policy, journald/logrotate, time sync, users/sudo/SSH hardening, firewall basics, backups) with a documented report."
---

# debian-ops-baseline (Playbook)

Use this to standardize Debian hosts for production: predictable updates, logs, access controls, and backup readiness.

## When to use (triggers)
- Provisioning a new Debian server/VM.
- Hardening or standardizing an existing server.
- Preparing for production deployment.

## Inputs / Outputs
- Inputs: server purpose, environment, access model, update policy, backup tool, service inventory.
- Outputs: baseline report + list of applied changes + verification evidence.

## Step sequence (Inventory -> Configure -> Secure -> Backup -> Verify)
1) Inventory
   - Record OS version, services, open ports, and critical configs.
2) Configure
   - APT sources policy, time sync, journald retention, logrotate posture.
3) Secure
   - Users/sudo policy, SSH baseline, firewall baseline.
4) Backup readiness
   - Document what must be backed up and how restores are tested.
5) Verify
   - Verify services, access, and logs after changes; capture evidence.

## Templates
- Baseline report: `assets/server-baseline-report.md`
- Checklist: `references/checklist.md`

## Definition of Done
- Baseline report completed and stored with the system docs/runbook.
- Critical access paths verified (SSH/sudo) and logs/updates configured.

## Related skills
- `linux-security-baseline` and `it-runbook-documentation`.

