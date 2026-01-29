---
name: pve-backup-restore
description: "Proxmox VE backup and restore playbook. Use when defining backup policy (RPO/RTO), validating restores, handling offsite/encryption, and documenting a repeatable restore test protocol (core-verify-before-claim)."
---

# pve-backup-restore (Playbook)

Use this to build a backup posture you can trust: a written policy plus routine restore tests.

## When to use (triggers)
- Setting up backups for new VMs/CTs.
- After changing storage, encryption, or backup tooling (e.g., PBS conceptually).
- Before major upgrades or risky maintenance.

## Inputs / Outputs
- Inputs: inventory of VMs/CTs, criticality tiers, storage/backups tooling, offsite requirements, encryption requirements.
- Outputs: backup policy + restore test protocol + evidence logs of restore tests.

## Step sequence (Policy -> Implement -> Test -> Review -> Automate)
1) Policy
   - Define tiers with RPO/RTO targets.
   - Define retention and offsite requirements.
2) Implement
   - Configure schedules, retention, and encryption posture.
3) Test (required)
   - Perform restore tests per tier; record outcomes.
4) Review
   - Adjust policy based on test findings and operational constraints.
5) Automate
   - Automate reminders/CI-like checks for restore test cadence.

## Restore testing rules
- A backup is not “good” until a restore test passes.
- Test into an isolated network or non-prod environment.
- Verify application-level behavior, not just “VM booted”.

## Templates
- Backup policy: `assets/backup-policy.md`
- Restore test protocol: `assets/restore-test-protocol.md`
- Restore evidence log: `references/restore-evidence-log.md`

## Definition of Done
- Policy exists and covers all critical workloads.
- Restore tests performed and recorded on a schedule.
- Gaps are tracked with owners and due dates.

