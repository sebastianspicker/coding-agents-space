---
name: pve-basics-ops
description: "Proxmox VE operations basics playbook. Use when operating PVE nodes/clusters (safe changes, updates, reboots, maintenance windows, and log-based troubleshooting) with a change log and rollback planning."
---

# pve-basics-ops (Playbook)

Use this for routine and incident-adjacent PVE operations: understanding node/cluster state, planning maintenance, and collecting evidence from logs.

## When to use (triggers)
- Planning updates, reboots, or maintenance windows.
- “Something is wrong with the node/cluster” and you need a safe triage workflow.
- Before making changes that could affect VM uptime.

## Inputs / Outputs
- Inputs: node/cluster inventory, workload criticality, maintenance window constraints, backup posture.
- Outputs: maintenance runbook + change log entry + verification evidence.

## Step sequence (Assess -> Plan -> Execute -> Verify -> Record)
1) Assess
   - Identify affected node(s), VMs/CTs, and current health signals.
2) Plan
   - Choose a maintenance window and define success criteria.
   - Confirm backup/restore readiness for critical workloads.
3) Execute (minimize risk)
   - Apply changes in small steps; prefer reversible actions.
4) Verify
   - Confirm cluster health, storage health, and VM/CT status.
5) Record
   - Write a change log entry with timestamps and outcomes.

## Safety rules (ops hygiene)
- Never “wing it” on prod nodes without a rollback plan.
- Prefer draining/migrating workloads before disruptive changes.
- Capture evidence (before/after) in a log; avoid success claims without verification.

## Templates
- Maintenance runbook: `assets/maintenance-runbook.md`
- Change log entry: `assets/change-log.md`
- Evidence checklist: `references/evidence-checklist.md`

## Definition of Done
- Planned change executed in the window (or explicitly aborted).
- Health checks passed and evidence recorded.
- Follow-ups filed (if issues discovered).

## Related skills
- `pve-backup-restore` for backup policy and restore testing.
- `pve-networking` and `pve-storage-zfs` for deep dives.

