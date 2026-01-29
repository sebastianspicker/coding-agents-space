---
name: k8s-deploy-workflow
description: "Kubernetes deployment workflow playbook. Use when releasing changes to a cluster (GitOps/apply/Helm), planning rollouts, handling config and migrations safely, and enforcing core-verify-before-claim with rollback gates."
---

# k8s-deploy-workflow (Playbook)

Use this to ship changes to Kubernetes with predictable rollouts and evidence-based verification.

## When to use (triggers)
- Deploying a new version of a service/workload to Kubernetes.
- Rolling out config changes (ConfigMaps/Secrets/env/probes/resources).
- Running schema/data migrations alongside a deploy.
- Introducing canary/blue-green concepts (even if done manually).

## Inputs / Outputs
- Inputs: target cluster/namespace, rollout mechanism (GitOps/apply/Helm), risk level, migration needs, rollback strategy.
- Outputs: rollout plan + release checklist + verification evidence + clear rollback steps.

## Step sequence (Plan -> Prepare -> Rollout -> Verify -> Stabilize)
1) Plan
   - Define scope (what changes, which workloads, which namespaces).
   - Define success criteria (health + functional smoke checks).
   - Define rollback trigger and rollback method.
2) Prepare
   - Ensure manifests render cleanly (lint/validate).
   - Confirm secrets/config inputs exist and are correct.
   - If migrations: define forward-only plan or reversible strategy.
3) Rollout
   - Apply via your chosen mechanism (GitOps/apply/Helm).
   - Monitor rollout status and cluster events.
4) Verify (core-verify-before-claim)
   - Rollout status green + smoke tests pass + key metrics stable.
5) Stabilize
   - Monitor for a defined window; document final state and follow-ups.

## Rollout strategy notes (conceptual)
- Rolling update: simplest; ensure readiness probes and proper surge/unavailable settings.
- Canary/blue-green: prefer when risk is high or rollback must be instant; keep traffic switch reversible.

## Migration safety rules
- Prefer backward-compatible migrations (expand/contract).
- Avoid coupling a destructive migration to the same deploy unless you have a tested rollback.
- Record migration version/state and a verification query.

## Templates
- Release checklist: `assets/release-checklist.md`
- Rollout plan: `assets/rollout-plan.md`
- In-cluster smoke checks: `references/smoke-checks.md`

## Definition of Done
- Rollout completed with evidence (commands + outputs).
- Smoke checks passed; key SLO signals stable for the monitoring window.
- Rollback procedure is known and tested (at least once in non-prod if possible).

## Related skills
- `k8s-debug` for failures during rollout.
- `helm-release-workflow` / `kustomize-workflow` for rendering/diff gates.
- `core-verify-before-claim` for the evidence discipline.

