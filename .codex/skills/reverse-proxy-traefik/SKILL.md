---
name: reverse-proxy-traefik
description: "Traefik reverse proxy playbook. Use when configuring or debugging Traefik routing, entrypoints, TLS termination, middlewares, service discovery (Docker/Kubernetes), and access logs with a verification-first workflow."
---

# reverse-proxy-traefik (Playbook)

Use this to operate Traefik as a reverse proxy/load balancer with clear routing rules and observable behavior.

## When to use (triggers)
- Adding a new route/host/path to Traefik.
- Debugging 404s, 502s, or TLS/cert selection issues.
- Managing middleware (headers, redirects, auth) safely.

## Inputs / Outputs
- Inputs: provider (Docker/K8s/file), entrypoints, domains, TLS method (ACME/manual), desired middlewares, upstream service mapping.
- Outputs: minimal config/rule changes + verification commands + log evidence.

## Step sequence (Map -> Configure -> Validate -> Observe -> Verify)
1) Map
   - Define desired routing: host, path, entrypoint, service.
2) Configure
   - Apply minimal rule/middleware changes.
3) Validate
   - Ensure config loads cleanly and the router/service is recognized.
4) Observe
   - Use access logs and dashboard (if enabled) to confirm routing decisions.
5) Verify
   - Verify from client and (when possible) from inside the network.

## Common pitfalls
- Router rule mismatch (host/path) causing 404.
- Wrong entrypoint (http vs https) or missing redirect.
- TLS resolver mismatch or stale certs.
- Service discovery labels/annotations wrong.

## Templates
- Routing checklist: `assets/routing-checklist.md`
- Troubleshooting checklist: `references/troubleshooting.md`

## Definition of Done
- Route matches correctly (host/path/entrypoint) with evidence from access logs.
- TLS is valid and renewal/rotation is accounted for.

## Related skills
- `docker-networking-debug`, `k8s-networking-debug` depending on provider.
- `tls-acme-automation` for ACME posture and rotation hygiene.

