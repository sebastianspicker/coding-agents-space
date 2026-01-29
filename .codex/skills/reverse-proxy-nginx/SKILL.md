---
name: reverse-proxy-nginx
description: "Nginx reverse proxy playbook. Use when configuring or debugging Nginx for TLS termination, upstream routing, timeouts, WebSockets, headers, logging, and safe-by-default proxy settings on Linux/Debian."
---

# reverse-proxy-nginx (Playbook)

Use this to operate Nginx as a reverse proxy with secure defaults and predictable troubleshooting.

## When to use (triggers)
- Setting up a new vhost for an app/API.
- Debugging 4xx/5xx, 502/503, upstream timeouts, or WebSocket failures.
- Tuning headers, uploads, and proxy timeouts safely.

## Inputs / Outputs
- Inputs: upstream host/port, domain(s), TLS source (ACME/manual), required headers, expected paths, upload sizes/timeouts.
- Outputs: minimal Nginx config + verification commands + log queries + rollback plan.

## Step sequence (Define -> Configure -> Validate -> Reload -> Verify)
1) Define
   - Confirm upstream behavior directly (curl to upstream).
   - Define required headers (Host, X-Forwarded-For, X-Forwarded-Proto).
2) Configure
   - Start from a minimal, secure-by-default server block.
   - Add only required features (uploads/WebSockets) explicitly.
3) Validate
   - Config test before reload.
4) Reload
   - Reload gracefully; keep rollback ready.
5) Verify
   - Verify via curl, browser, and access/error logs.

## Common pitfalls
- Missing `proxy_set_header Host` or incorrect upstream scheme.
- Timeouts too low (or too high hiding failures).
- WebSockets need upgrade headers.
- Large uploads require explicit limits.
- TLS chain or SNI mismatch (see `tls-acme-automation` + `linux-tls-debug`).

## Templates
- Secure-by-default server block: `assets/nginx-site.conf`
- Troubleshooting checklist: `references/troubleshooting.md`

## Definition of Done
- `nginx -t` passes and reload is successful.
- Requests route correctly; logs show expected upstream status/latency.
- TLS is valid and renewals/rotation are accounted for (if applicable).

## Related skills
- `tls-acme-automation` for ACME issuance/renewal and rotation hygiene.
- `linux-network-debug` and `linux-tls-debug` for host-level diagnosis.

