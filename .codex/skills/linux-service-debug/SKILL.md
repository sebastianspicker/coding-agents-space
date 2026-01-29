---
name: linux-service-debug
description: "Playbook for linux-service-debug. Use when debugging Linux services (systemd, journald, networking, permissions, TLS) and documenting reproducible fixes."
---

# linux-service-debug (Playbook)

Use this for production-like Linux debugging: systemd services, logs, ports, permissions, disk, and TLS/cert issues.

## When to use (triggers)
- A systemd service won’t start or keeps restarting.
- The service runs but is unreachable or failing health checks.
- Permissions, file paths, DNS, or TLS issues in server environments.

## Inputs / Outputs
- Inputs: hostname/environment, service name, expected behavior, logs, recent changes.
- Outputs: root cause, minimal fix, and an operations note/runbook update.

## Step sequence (Identify -> Observe -> Hypothesize -> Fix -> Verify)
1) Identify
   - What service/unit is failing?
   - What changed recently (deploy/config/host update)?
2) Observe
   - systemd status:
     - `systemctl status <unit>`
     - `systemctl cat <unit>`
   - logs:
     - `journalctl -u <unit> -n 200 --no-pager`
   - ports:
     - `ss -ltnp` / `ss -lunp`
3) Hypothesize
   - Form one hypothesis and test it (config path, env var, permissions, missing binary).
4) Fix
   - Prefer smallest change:
     - correct unit settings
     - correct file permissions/ownership
     - correct environment file usage
5) Verify
   - `systemctl daemon-reload` (if unit changed)
   - restart service and re-check logs
   - confirm port/health endpoint works

## Common failure classes (checklist)
- Wrong WorkingDirectory or relative path assumptions.
- Missing environment variables (EnvironmentFile not loaded).
- Permissions on config/data paths.
- Port already in use.
- TLS cert expired or wrong chain.
- Resource limits (memory/disk) causing OOM or failures.

## Templates
- Service debug log: `assets/service-debug-log.md`
- systemd unit checklist: `references/systemd-checklist.md`

## Definition of Done
- Root cause is identified and evidenced.
- Fix is minimal and documented.
- Service is healthy and verification steps are recorded.

## Related skills
- `it-runbook-documentation` to document final operating procedures.
- `security-audit` if the issue involves exposure, credentials, or insecure defaults.

## Credits
- Influenced by ops/reliability playbooks from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (adapted into Linux/systemd-specific triage).
