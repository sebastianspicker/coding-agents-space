---
name: debian-web-stack
description: "Debian web stack playbook. Use when running web services on Debian (systemd units, env files, permissions, directories, reverse proxy integration) and when documenting repeatable deployment and rollback steps."
---

# debian-web-stack (Playbook)

Use this to run web apps safely on Debian with systemd and a reverse proxy.

## When to use (triggers)
- Deploying a web service on a Debian VM/host.
- Converting “run it in a shell” into a systemd-managed service.
- Integrating with a reverse proxy and TLS termination.

## Inputs / Outputs
- Inputs: app runtime (node/python/etc), listen port, env vars, user/group, directories, proxy choice.
- Outputs: systemd unit + env file convention + deployment checklist + rollback steps.

## Step sequence (Layout -> Unit -> Proxy -> Verify -> Document)
1) Layout
   - Define directories for code, config, data, logs.
2) Unit
   - Create a least-privilege systemd unit (non-root).
3) Proxy
   - Configure reverse proxy and TLS termination.
4) Verify
   - Verify service health, logs, and proxy routing.
5) Document
   - Create a mini runbook (deploy/rollback/rotate secrets).

## Templates
- systemd unit skeleton: `assets/systemd-unit.service`
- Deployment checklist: `assets/deploy-checklist.md`
- Permissions checklist: `references/permissions.md`

## Definition of Done
- Service runs under systemd with predictable restarts/logging.
- Reverse proxy routes correctly and TLS is valid (if used).
- Deploy/rollback steps documented and tested at least once.

## Related skills
- `reverse-proxy-nginx` / `reverse-proxy-traefik` / `reverse-proxy-caddy`
- `tls-acme-automation`
- `linux-service-debug`

