---
name: pve-storage-zfs
description: "Proxmox VE ZFS storage playbook. Use when operating or debugging ZFS-backed storage on PVE (pool health, scrubs, snapshots/replication, ARC/memory, quotas, capacity issues) with safe recovery steps and evidence logging."
---

# pve-storage-zfs (Playbook)

Use this to keep ZFS healthy and to troubleshoot storage-related issues on Proxmox VE.

## When to use (triggers)
- VM disks slow or time out; IO errors; ZFS reports degraded/faulted.
- Capacity surprises (pool full, dataset quota/reservation).
- Planning scrubs, snapshots, replication, or pool changes.

## Inputs / Outputs
- Inputs: pool layout, disk inventory, workload IO profile, backup posture, maintenance constraints.
- Outputs: storage health report + recovery plan (if needed) + verification evidence.

## Step sequence (Assess -> Protect -> Diagnose -> Recover -> Verify)
1) Assess
   - Capture pool health and recent errors.
2) Protect
   - Ensure backups exist before risky operations.
   - If actively failing: prioritize data safety over performance tuning.
3) Diagnose
   - Identify whether it’s device failure, capacity pressure, or ARC/memory pressure.
4) Recover
   - Follow safe, incremental steps (scrub, replace device, free space, restore).
5) Verify
   - Confirm pool health, scrub status, and workload stability.

## Templates
- Storage health report: `assets/storage-health-report.md`
- Recovery runbook: `assets/recovery-runbook.md`
- ZFS operations checklist: `references/zfs-checklist.md`

## Definition of Done
- Pool health is stable (or risk is documented).
- Recovery steps executed safely with evidence.
- Follow-up actions created (hardware replacement, capacity planning, monitoring).

