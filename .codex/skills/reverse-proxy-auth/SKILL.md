---
name: reverse-proxy-auth
description: "Reverse proxy authentication playbook. Use when adding SSO/OIDC/forward-auth patterns (oauth2-proxy style), securing cookies/headers, handling WebSockets, and logging/auditing auth decisions at the proxy layer with a rollback plan."
---

# reverse-proxy-auth (Playbook)

Use this to add authentication at the reverse proxy layer without breaking apps or creating header/cookie security issues.

## When to use (triggers)
- Protecting internal apps behind a proxy with SSO/OIDC (conceptual).
- Adding forward-auth/oauth2-proxy style patterns.
- Debugging auth redirect loops, missing headers, or WebSocket auth issues.

## Inputs / Outputs
- Inputs: proxy type (Nginx/Traefik/Caddy/etc.), identity provider assumptions, protected routes, cookie/session requirements, upstream header expectations.
- Outputs: auth routing matrix + cookie/header checklist + rollback plan + verification steps.

## Step sequence (Scope -> Integrate -> Harden -> Verify -> Monitor)
1) Scope
   - Define which routes require auth and which must stay public (health checks, ACME, etc.).
2) Integrate
   - Implement forward-auth flow or upstream auth proxy; keep it minimal initially.
3) Harden
   - Apply cookie and header security rules; avoid leaking identity headers to unintended backends.
4) Verify
   - Verify:
     - auth required routes block unauthenticated users
     - authenticated users reach upstream
     - WebSockets behave correctly (if used)
5) Monitor
   - Log auth decisions and watch for loops and error spikes.

## Cookie/header security (high-level)
- Cookies:
  - `Secure`, `HttpOnly`, `SameSite` policy intentional
  - consistent domain/path scope
- Headers:
  - avoid trusting user-provided identity headers
  - strip/overwrite identity headers at the proxy boundary

## Templates
- Auth routing matrix: `assets/auth-routing-matrix.md`
- Cookie/header checklist: `assets/cookie-header-checklist.md`
- Rollback plan: `assets/rollback-plan.md`
- Pitfalls: `references/pitfalls.md`

## Definition of Done
- Auth behavior matches routing matrix (verified via test plan).
- Cookies/headers are configured safely and consistently.
- Rollback is documented and tested in a safe environment if possible.

## Related skills
- `reverse-proxy-nginx`, `reverse-proxy-traefik`, `reverse-proxy-caddy`.
- `web-security-audit` for web-specific hardening considerations.

