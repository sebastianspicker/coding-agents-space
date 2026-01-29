---
name: log-rotation-debug
description: "Log rotation debugging playbook. Use when disks fill due to logs or rotation fails: journald vs logrotate interplay, app vs system logs, safe cleanup (truncate vs delete), retention policy, and verification that rotation actually occurs."
---

# log-rotation-debug (Playbook)

Use this when log growth threatens availability (disk full) or when rotation is suspected to be broken.

## When to use (triggers)
- Disk usage grows quickly due to logs.
- Services fail due to “no space left on device”.
- logrotate/journald rotation policies are unclear or not effective.

## Inputs / Outputs
- Inputs: OS (Debian), affected partitions, log sources, journald settings, logrotate configs, service owners.
- Outputs: incident log + safe cleanup plan + fixed rotation config + verification evidence.

## Step sequence (Triage -> Identify -> Contain -> Fix -> Verify -> Prevent)
1) Triage
   - Confirm what partition is full and how urgent it is.
2) Identify
   - Identify top offenders (which logs/dirs).
3) Contain (safe cleanup)
   - Prefer safe truncation/cleanup strategies; avoid deleting critical logs blindly.
4) Fix
   - Fix rotation policy (journald retention, logrotate config, app-level rotation).
5) Verify
   - Verify rotation triggers and space returns; monitor for recurrence.
6) Prevent
   - Add monitoring/alerts and clear ownership.

## Templates
- Log growth incident log: `assets/log-growth-incident-log.md`
- Rotation config checklist: `assets/rotation-config-checklist.md`
- Safe cleanup plan: `assets/safe-cleanup-plan.md`
- Command snippets: `references/commands.md`

## Definition of Done
- Disk space stabilized and services restored.
- Rotation policy documented and verified.
- Monitoring and follow-ups assigned.

## Related skills
- `linux-storage-debug` and `debian-ops-baseline`.
- `ops-incident-response` for operational coordination.

