---
name: tls-acme-automation
description: "TLS + ACME automation playbook. Use when issuing, renewing, and rotating certificates (ACME/Let’s Encrypt or similar), validating chains/SNI/ALPN, monitoring expiry, and performing safe rotations for reverse proxies and services."
---

# tls-acme-automation (Playbook)

Use this to keep TLS healthy: issuance, renewal, monitoring, and safe rotations without downtime.

## When to use (triggers)
- Setting up automatic HTTPS via ACME.
- Certificate renewals failing or cert near expiry.
- Rotating certs/keys safely (planned or emergency).
- Debugging chain/SNI/ALPN/trust-store issues.

## Inputs / Outputs
- Inputs: domain(s), termination point (proxy/service), ACME client/proxy, required SANs, monitoring stack.
- Outputs: rotation plan + verification commands + expiry monitoring checklist + evidence log.

## Step sequence (Inventory -> Issue/Renew -> Verify -> Monitor -> Rotate)
1) Inventory
   - Identify where TLS terminates and where certs/keys are stored.
2) Issue/Renew
   - Ensure ACME challenge method works (HTTP-01/DNS-01) and is documented.
3) Verify
   - Verify with `openssl`/`curl` and confirm chain and hostname.
4) Monitor
   - Add expiry monitoring and renewal failure alerts.
5) Rotate
   - Use a safe rotation runbook; confirm old cert removal only after validation.

## Rotation safety rules
- Prefer overlapping validity (install new cert before removing old).
- Keep rollback: retain previous cert for a defined window.
- Avoid logging private key material; treat as secret.

## Templates
- Rotation runbook: `assets/rotation-runbook.md`
- Expiry monitoring checklist: `assets/expiry-monitoring.md`
- Verification commands: `references/verify-commands.md`

## Definition of Done
- Cert chain/hostname validation passes.
- Renewals are automated and monitored.
- Rotation process is documented and tested in non-prod if possible.

## Related skills
- `linux-tls-debug` for deeper TLS diagnostics.
- Reverse proxy skills (`reverse-proxy-nginx`, `reverse-proxy-traefik`, `reverse-proxy-caddy`).

