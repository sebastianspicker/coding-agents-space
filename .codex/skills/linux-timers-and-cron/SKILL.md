---
name: linux-timers-and-cron
description: "Playbook for linux-timers-and-cron. Use when debugging or designing scheduled jobs (systemd timers/cron) with logging, locking, idempotency, and retries."
---

# linux-timers-and-cron (Playbook)

Use this for scheduled job reliability: cron and systemd timers, plus their failure/debug patterns.

## When to use (triggers)
- Cron job “doesn’t run” or runs with a different environment.
- Timer jobs overlap and corrupt state.
- Scheduled jobs are flaky and need logging/retries.

## Inputs / Outputs
- Inputs: job purpose, schedule, script path, expected outputs, environment constraints.
- Outputs: job definition fix + logging/locking improvements + verification steps.

## Step sequence (Locate -> Inspect -> Fix -> Verify)
1) Locate
   - Cron:
     - `crontab -l`
     - check `/etc/cron.*` and `/etc/crontab` as applicable
   - systemd:
     - `systemctl list-timers --all`
     - `systemctl status <timer>` and `<service>`
2) Inspect
   - Logs:
     - `journalctl -u <service> -n 200 --no-pager`
   - Environment:
     - cron has minimal PATH; systemd can set EnvironmentFile.
3) Fix
   - Make job idempotent when possible.
   - Add locking to prevent overlap.
   - Ensure logs go somewhere searchable (journald or file with rotation).
4) Verify
   - Trigger manually and confirm expected behavior.

## Locking patterns
- Prefer `flock` (if available) for simple mutual exclusion.
- Ensure lock acquisition failure is logged and exits cleanly.

## Templates
- systemd timer template: `assets/example.timer`
- systemd service template: `assets/example.service`
- Cron entry template: `assets/cron-entry.txt`

## Definition of Done
- Job runs reliably with known environment.
- No overlapping executions (or overlap is safe).
- Logs are available for troubleshooting and retention is handled.
