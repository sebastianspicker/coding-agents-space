---
name: pve-storage-ceph
description: "Proxmox VE Ceph storage playbook. Use when operating or debugging Ceph-backed storage on PVE: interpreting health states, managing backfill/rebalance impact, capacity planning, public vs cluster networks, OSD failures, scrubs, and safe recovery."
---

# pve-storage-ceph (Playbook)

Use this to operate Ceph on Proxmox VE with a “data safety first” posture and predictable maintenance workflows.

## When to use (triggers)
- Ceph health not OK (warnings/errors) or performance drops during recovery/backfill.
- OSD down/out or suspected disk failure.
- Capacity pressure or rebalancing activity affects workloads.
- Planning maintenance (scrub scheduling, OSD replacement, network changes).

## Inputs / Outputs
- Inputs: cluster topology, OSD inventory, network layout (public/cluster), workload criticality, maintenance window.
- Outputs: health report + incident log + recovery runbook + maintenance checklist with verification evidence.

## Step sequence (Assess -> Stabilize -> Recover -> Verify -> Prevent)
1) Assess
   - Capture current health status and recent changes.
2) Stabilize
   - Prioritize data safety and service continuity over peak performance.
3) Recover
   - Address the primary failure domain (OSD, network, capacity).
4) Verify
   - Verify health improves and VM/CT IO stabilizes.
5) Prevent
   - Add monitoring and capacity headroom policies; document procedures.

## Concepts to document (for your cluster)
- Health states and what “OK/WARN/ERR” mean operationally.
- Backfill/rebalance impact and how you schedule/limit it.
- Network separation: what’s on the public network vs cluster network.
- Scrub policy and how to monitor it.

## Templates
- Ceph health report: `assets/ceph-health-report.md`
- Incident log: `assets/incident-log.md`
- Recovery runbook: `assets/recovery-runbook.md`
- Maintenance checklist: `references/maintenance-checklist.md`

## Definition of Done
- Health state is stable (or residual risks documented).
- Recovery steps executed with evidence and minimal risk.
- Follow-ups created for monitoring/capacity/hardware actions.

## Related skills
- `pve-basics-ops` and `pve-backup-restore`.
- `linux-network-debug` for underlying networking diagnostics.

