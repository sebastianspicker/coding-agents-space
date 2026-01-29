---
name: reverse-proxy-caddy
description: "Caddy reverse proxy playbook. Use when configuring or debugging Caddy for automatic HTTPS (ACME), reverse_proxy routing, headers, WebSockets, and logging with secure defaults and reproducible verification."
---

# reverse-proxy-caddy (Playbook)

Use this for simple, secure reverse proxy setups with Caddy’s automatic TLS and a minimal configuration surface.

## When to use (triggers)
- Setting up a new site/app behind Caddy.
- Debugging routing, TLS, or upstream connectivity.
- Adding headers, redirects, or timeouts safely.

## Inputs / Outputs
- Inputs: domain(s), upstream address, desired headers, logging location, ACME email/constraints.
- Outputs: minimal Caddyfile + verification evidence (curl + logs).

## Step sequence (Define -> Configure -> Reload -> Verify -> Monitor)
1) Define
   - Confirm upstream works locally (curl).
2) Configure
   - Start minimal; add headers/redirects intentionally.
3) Reload
   - Reload config and watch logs for parse/ACME issues.
4) Verify
   - Verify HTTPS, headers, and upstream status codes.
5) Monitor
   - Ensure renewal posture and log rotation are accounted for.

## Templates
- Minimal Caddyfile: `assets/Caddyfile`
- Troubleshooting checklist: `references/troubleshooting.md`

## Definition of Done
- HTTPS works; cert is valid and renewals are monitored.
- Requests route correctly; logs show expected behavior.

## Related skills
- `tls-acme-automation` for ACME posture and certificate lifecycle.
- `linux-tls-debug` for deep TLS debugging.

