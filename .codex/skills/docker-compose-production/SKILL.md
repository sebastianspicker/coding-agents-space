---
name: docker-compose-production
description: "Playbook for docker-compose-production. Use when running docker compose in a prod-like way (profiles/overrides, healthchecks, migrations, backups, restart policies, log hygiene)."
---

# docker-compose-production (Playbook)

Use this when you want Compose to behave predictably in production-like environments.

## When to use (triggers)
- Moving from “local compose dev” to staging/prod-like operations.
- You need migrations, healthchecks, and deterministic startup ordering.
- You need backup/restore runbooks for compose-managed state.

## Inputs / Outputs
- Inputs: compose files, environment model, data paths/volumes, required uptime, deployment constraints.
- Outputs: compose changes + runbook notes + verification steps.

## Step sequence (Design -> Implement -> Verify -> Document)
1) Design
   - Identify stateful services and backup strategy.
   - Decide environment separation (profiles, overrides, env files).
2) Implement
   - Add healthchecks and readiness strategy.
   - Add migrations as an explicit one-off job (don’t hide them in app startup unless required).
   - Add restart policies intentionally.
3) Verify
   - `docker compose up -d` and verify health.
   - Run migrations and verify idempotency.
4) Document
   - Record operational commands, rollback, and backup/restore in a runbook.

## Templates
- Compose prod notes: `assets/compose-prod-notes.md`
- Compose baseline example: `assets/docker-compose.prod.yml`
- Ops checklist: `references/ops-checklist.md`

## Definition of Done
- Startup is reliable (healthchecks + readiness).
- Migrations are explicit and repeatable.
- Backup/restore procedures exist and are safe.

## Related skills
- `docker-debug` for runtime issues.
- `it-runbook-documentation` for long-form ops docs.
