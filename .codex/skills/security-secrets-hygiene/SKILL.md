---
name: security-secrets-hygiene
description: "Secrets and configuration hygiene playbook. Use when managing secrets safely (env vars, .env, CI, Docker), preventing leaks, and documenting secure setup."
---

# security-secrets-hygiene (Playbook)

Use this to prevent the most common production mistakes: secrets in git, secrets in logs, and configuration drift.

## When to use (triggers)
- Adding new credentials, API keys, tokens, certs, or OAuth configs.
- Setting up `.env` / CI secrets / Docker build args.
- Auditing for accidental secret leakage or unsafe defaults.

## Inputs / Outputs
- Inputs: target environment(s), how secrets are stored today, what integrations exist, constraints (local only vs CI/CD).
- Outputs: safe configuration plan + sanitized docs + verification steps.

## Step sequence (Inventory -> Store -> Use -> Redact -> Verify)
1) Inventory
   - List required secrets and non-secret config separately.
2) Store
   - Choose storage:
     - local dev: `.env` (never committed) or OS keychain
     - CI: secret store (GitHub Actions secrets, etc.)
     - prod: secret manager (preferred)
3) Use
   - Load config explicitly and validate at startup.
   - Fail fast with clear errors if missing.
4) Redact
   - Ensure logs never contain secrets/tokens.
   - Sanitize example configs before committing.
5) Verify
   - Run a secrets scan (if available) or targeted searches.
   - Confirm `.gitignore` protects local secret files.

## Hard rules
- Never commit secrets (including “temporary” keys).
- Don’t paste secrets into docs; reference where they live and required access.
- Don’t log raw tokens, auth headers, or full request bodies by default.

## Templates
- Config inventory: `assets/config-inventory.md`
- `.env.example` template: `assets/dotenv-example.txt`
- Redaction checklist: `references/redaction-checklist.md`

## Definition of Done
- Secrets are stored in appropriate secret storage and not committed.
- Example configs are safe (`.env.example` only, no real values).
- Verification confirms no secret leakage in repo and logs.

## Related skills
- `security-audit` for broader security review.
- `it-runbook-documentation` for documenting secure setup steps.

## Credits
- Influenced by secure defaults guidance from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (adapted to a repo-first configuration workflow).
