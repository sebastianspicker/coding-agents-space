---
name: cicd-release-pipelines
description: "CI/CD release pipelines playbook. Use when designing or auditing build/test/deploy pipelines: environment separation, approvals, secrets management, artifact versioning, rollback strategy, and evidence-based verification for releases."
---

# cicd-release-pipelines (Playbook)

Use this to build CI/CD that is safe and auditable: reliable builds, clear environments, and controlled releases.

## When to use (triggers)
- You are creating or refactoring CI/CD pipelines.
- Releases are risky due to missing approvals/artifact discipline.
- Secrets handling in CI is unclear or risky.

## Inputs / Outputs
- Inputs: repo structure, environments, release cadence, artifact types, compliance constraints.
- Outputs: pipeline design + checklist + rollout/rollback plan + verification commands.

## Step sequence (Design -> Build -> Test -> Deploy -> Verify -> Rollback)
1) Design
   - Define environment stages (dev/staging/prod) and promotion rules.
2) Build
   - Create deterministic artifacts with version identifiers.
3) Test
   - Run unit/integration/E2E as appropriate; keep flaky tests isolated.
4) Deploy
   - Deploy with approvals for high-risk envs.
5) Verify
   - Verify with smoke checks and metrics; record evidence.
6) Rollback
   - Define rollback strategy and practice it at least once.

## Templates
- Pipeline checklist: `assets/pipeline-checklist.md`
- Release plan: `assets/release-plan.md`
- Security notes: `references/security.md`

## Definition of Done
- Artifacts are versioned and promotion is controlled.
- Secrets are managed safely and audited.
- Deploys include verification and rollback readiness.

## Related skills
- `repo-ci-triage`, `repo-release-versioning`, `security-secrets-hygiene`.

