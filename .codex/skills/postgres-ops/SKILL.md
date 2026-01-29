---
name: postgres-ops
description: "PostgreSQL operations playbook. Use when operating Postgres for production: migrations, backup/restore drills, performance triage, connection pooling, safe configuration changes, and incident workflows with verification evidence."
---

# postgres-ops (Playbook)

Use this to run Postgres safely: predictable migrations, proven restores, and a repeatable performance/incident workflow.

## When to use (triggers)
- Planning schema migrations or large data backfills.
- You need backup policy and restore drills (RPO/RTO).
- Performance issues (slow queries, lock contention, high CPU/IO).
- Connection storms or pool tuning needs.

## Inputs / Outputs
- Inputs: workload profile, migration plan, backup tooling, replication topology (if any), SLOs.
- Outputs: migration plan + backup/restore test log + performance triage log + config change record.

## Step sequence (Plan -> Migrate -> Backup -> Restore -> Triage -> Verify)
1) Plan
   - Identify critical tables/queries and rollback strategy.
2) Migrate
   - Prefer backward-compatible migrations; split risky steps.
3) Backup
   - Ensure backups run and are monitored; record scope and retention.
4) Restore drills
   - Regularly restore into a safe environment; verify application-level behavior.
5) Performance triage
   - Diagnose: query plans, locks, saturation, connection pool behavior.
6) Verify
   - Verify metrics improve and regressions are prevented (tests/runbooks).

## Templates
- Migration plan: `assets/migration-plan.md`
- Backup/restore drill: `assets/backup-restore-drill.md`
- Performance triage log: `assets/perf-triage-log.md`
- Ops checklist: `references/checklist.md`

## Definition of Done
- Migrations executed safely with verification and rollback plan.
- Restore drills are performed and recorded.
- Performance incidents produce actionable follow-ups (indexes, pool tuning, query fixes).

## Related skills
- `api-contracts` (if DB changes affect API outputs) and `ops-incident-response`.

