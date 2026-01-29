---
name: pve-pbs-ops
description: "Proxmox Backup Server operations playbook. Use when operating PBS: datastore layout, retention/pruning, verify jobs, encryption/key management, restore drills, offsite replication, monitoring/alerting, and producing backup integrity evidence."
---

# pve-pbs-ops (Playbook)

Use this to operate Proxmox Backup Server with a focus on integrity and restore confidence.

## When to use (triggers)
- Introducing PBS or adding new datastores/jobs.
- Backups run but restores are untested or integrity is uncertain.
- Tuning retention/pruning/verify and monitoring failures.
- Planning offsite replication or encryption key handling.

## Inputs / Outputs
- Inputs: workload inventory and tiers (RPO/RTO), datastores, retention policy, encryption posture, offsite requirements.
- Outputs: PBS inventory + backup policy addendum + verify/restore evidence logs + monitoring checklist.

## Step sequence (Inventory -> Policy -> Verify -> Restore -> Monitor -> Review)
1) Inventory
   - Document datastores, schedules, and what workloads map to which jobs.
2) Policy
   - Define retention/pruning and integrity verification cadence.
3) Verify
   - Run verify jobs and treat failures as actionable.
4) Restore drills
   - Perform routine restore drills; record outcomes (core-verify-before-claim).
5) Monitor
   - Alert on job failures, verify failures, and datastore capacity.
6) Review
   - Review retention/offsite posture and rotate keys where applicable.

## Templates
- PBS inventory: `assets/pbs-inventory.md`
- Backup policy addendum (PBS): `assets/backup-policy-addendum.md`
- Verify/restore evidence log: `assets/verify-restore-evidence-log.md`
- Monitoring checklist: `references/monitoring-checklist.md`

## Definition of Done
- PBS inventory and policy exist.
- Verify jobs run and results are recorded.
- Restore drills occur on schedule and are documented.

## Related skills
- `pve-backup-restore` for broader policy and restore testing discipline.
- `security-secrets-hygiene` for key handling and access controls.

