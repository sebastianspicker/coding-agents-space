---
name: linux-storage-debug
description: "Playbook for linux-storage-debug. Use when debugging disk/inode exhaustion, permissions, mounts, and log growth with safe recovery steps."
---

# linux-storage-debug (Playbook)

Use this for storage and filesystem problems: disk full, inode exhaustion, permission issues, mount surprises, and runaway logs.

## When to use (triggers)
- “No space left on device” (even when `df -h` looks fine).
- Services fail due to permissions or missing mount points.
- Logs/volumes grow without bound.

## Inputs / Outputs
- Inputs: host paths, affected service, error logs, recent deploys, mount layout.
- Outputs: root cause + safe remediation + verification + runbook update notes.

## Step sequence (Measure -> Locate -> Fix -> Verify)
1) Measure
   - `df -h`
   - `df -i` (inodes)
   - `lsblk` / `mount`
2) Locate
   - `du -xhd1 /path` (stay on filesystem when appropriate)
   - Identify large offenders (logs, caches, temp).
3) Fix (safe)
   - Prefer deletion of caches/temp over state.
   - Rotate or compress logs; configure retention.
   - Fix ownership and permissions explicitly (`chown`, `chmod`) with least privilege.
4) Verify
   - Re-run the failing operation/service.
   - Confirm free space/inodes and service health.

## Safe cleanup rules
- Don’t delete data directories unless you have verified backups and restore steps.
- Prefer moving large files to a quarantine folder first when unsure.

## Templates
- Storage debug log: `assets/storage-debug-log.md`
- Cleanup checklist: `references/cleanup-checklist.md`

## Definition of Done
- Root cause is identified (space vs inode vs mount vs permissions).
- Remediation is safe and documented.
- Service resumes normal operation and future recurrence is mitigated.
