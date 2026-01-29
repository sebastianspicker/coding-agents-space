---
name: web-security-audit
description: "Playbook for web-security-audit. Use when auditing web apps (React/Next.js/API) for common web vulnerabilities (OWASP) and hardening headers, sessions, and request handling."
---

# web-security-audit (Playbook)

Use this for web-specific security reviews focused on browser-facing attack surfaces.

## When to use (triggers)
- You’re auditing a web app (React/Next.js) or its API routes.
- You suspect XSS/CSRF/CORS issues, auth/session bugs, or insecure headers.
- You’re shipping a high-risk feature (auth, payments, file upload, URL fetch).

## Inputs / Outputs
- Inputs: deployment model (SSR/SPA), auth model, domains, cookies, API routes, threat assumptions.
- Outputs: prioritized findings + hardening patch list + verification steps.

## Step sequence (Map -> Review -> Test -> Report)
1) Map the surface
   - Identify entry points: pages, APIs, webhooks, uploads, redirects.
   - Identify auth/session mechanism and where it’s enforced.
2) Review patterns
   - Input validation at boundaries
   - Output encoding and templating patterns
   - CORS and CSRF posture
3) Test (non-destructive)
   - Attempt known-bad payloads in safe dev env
   - Verify headers/cookies behavior in browser devtools
4) Report + patch
   - Create minimal changes that close the highest risks first.

## Web checklist (starter)
- XSS
  - React escapes by default, but watch `dangerouslySetInnerHTML`.
  - Validate and encode any HTML/markdown rendering pipelines.
- CSRF
  - Cookie-based sessions require CSRF strategy for state-changing requests.
- CORS
  - Avoid `Access-Control-Allow-Origin: *` with credentials.
- Cookies
  - Ensure correct `SameSite`, `Secure`, `HttpOnly`.
- Redirects
  - Prevent open redirects (validate returnTo/next params).

## Templates
- Web audit checklist: `references/web-checklist.md`
- Findings report template: `assets/report-template.md`

## Definition of Done
- Attack surface is mapped and prioritized.
- Findings are actionable with evidence and verification notes.
- Hardening changes are minimal and tested.

## Related skills
- `security-audit` for broader app/infra review patterns.
- `secure-implement` to implement remediations safely.

## Credits
- Informed by OWASP-style checklists and web hardening patterns; adapted to pair with this repo’s `security-audit` and `secure-implement` workflows.
