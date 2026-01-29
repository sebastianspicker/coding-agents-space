---
name: secure-implement
description: "Playbook for secure-implement. Use when implementing security-sensitive features (auth, sessions, input validation, crypto, headers) with safe defaults and verification."
---

# secure-implement (Playbook)

Use this for security-sensitive code changes: authentication/authorization, sessions, input validation, secret handling, security headers, and safe data access.

## When to use (triggers)
- Implementing auth flows, RBAC/ABAC, session cookies, JWT/OAuth/OIDC integration.
- Handling untrusted input (web requests, files, URLs).
- Hardening an app to OWASP-style issues.

## Inputs / Outputs
- Inputs: security requirements, threat model, target environment, existing auth/session patterns.
- Outputs: patch with secure defaults + verification steps + documented assumptions.

## Step sequence (Threat model -> Implement -> Verify)
1) Threat model (lightweight)
   - Define assets, attacker capabilities, trust boundaries.
   - List abuse cases (bypass auth, inject scripts, access others’ data).
2) Implement
   - Validate inputs at the boundary (schema validation).
   - Enforce authz on every privileged operation.
   - Use safe session settings and headers.
   - Avoid rolling your own crypto.
3) Verify
   - Add tests for security boundaries (negative tests).
   - Re-run existing tests and any security scans configured.

## Secure defaults checklist
- Secrets:
  - never hardcode secrets
  - don’t log secrets or raw tokens
- Auth:
  - explicit authz checks for every action/resource
  - default-deny logic
- Cookies/sessions (web):
  - `HttpOnly`, `Secure`, `SameSite` appropriate to flow
- Input:
  - schema validation (reject unknown fields if appropriate)
  - normalize and constrain URLs, file paths, IDs

## High-risk features (extra gates)
- Auth endpoints: rate limiting + brute-force protections.
- Passwords: use a modern password hashing function (argon2/bcrypt via well-known libs).
- Tokens: short expiry + rotation strategy + storage rules.
- File uploads: strict size/type validation and safe storage paths.
- URL fetch: SSRF mitigations (allowlist, scheme restrictions, IP range blocks).

## Templates
- Threat model template: `assets/threat-model.md`
- Secure coding checklist: `references/checklist.md`

## Definition of Done
- Security assumptions and controls are documented.
- Negative tests exist for key abuse cases when feasible.
- Relevant verification gates pass (tests/build/lint).

## Related skills
- `security-audit` for audit-first discovery and reporting.
- `web-security-audit` for web-specific hardening checks.

## Credits
- Inspired by secure coding workflows from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (OWASP-aligned defaults; rewritten as a small, actionable workflow).
