---
name: linux-tls-debug
description: "Playbook for linux-tls-debug. Use when debugging TLS on Linux (cert chain, expiry, SNI, ALPN, trust stores) and planning safe rotation."
---

# linux-tls-debug (Playbook)

Use this for TLS issues: bad cert chains, expired certs, SNI mismatches, client trust store issues, and proxy termination.

## When to use (triggers)
- Browser/curl reports certificate errors.
- TLS works on one client but fails on another.
- Reverse proxy termination or upstream TLS is misconfigured.

## Inputs / Outputs
- Inputs: domain, port, proxy topology, cert source (LetsEncrypt/manual), error messages.
- Outputs: root cause, safe fix/rotation plan, and verification commands.

## Step sequence (Identify -> Inspect -> Fix -> Verify)
1) Identify
   - Is TLS terminated at a proxy/load balancer or at the app?
2) Inspect
   - `openssl s_client -connect host:443 -servername host -showcerts`
   - `curl -v https://host/`
   - Check expiry and chain completeness.
3) Fix
   - Install full chain when required (leaf + intermediates).
   - Ensure correct SNI/server_name routing in proxy.
4) Verify
   - Re-run openssl and curl checks.
   - Test from at least one external client if possible.

## Rotation safety
- Prefer atomic swap of cert files + reload service.
- Keep previous cert/key available for rollback until verified.

## Templates
- TLS debug log: `assets/tls-debug-log.md`
- Verification commands: `references/verify.md`

## Definition of Done
- Cert chain and expiry are correct.
- Correct SNI/ALPN behavior for expected clients.
- Rotation/reload is documented and verified.
