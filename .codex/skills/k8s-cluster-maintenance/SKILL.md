---
name: k8s-cluster-maintenance
description: "Kubernetes cluster maintenance playbook. Use when planning upgrades and disruptive operations: node pool upgrades, cordon/drain discipline, control plane changes (conceptual), certificate rotation, and safe rollout of admission/policy changes with verification and rollback."
---

# k8s-cluster-maintenance (Playbook)

Use this to perform cluster maintenance with minimal downtime and clear verification. Keep it conservative: small steps, strong evidence, clear rollback.

## When to use (triggers)
- Upgrading node pools or cluster versions.
- Rotating certificates for cluster components (conceptual; implementation depends on distro).
- Introducing or changing admission/policy controls (Pod security policies/admission, etc.).

## Inputs / Outputs
- Inputs: cluster type/distro, maintenance window, workload criticality, upgrade path, rollback method, backup posture.
- Outputs: maintenance plan + drain checklist + verification evidence + post-change notes.

## Step sequence (Plan -> Preflight -> Execute -> Verify -> Monitor)
1) Plan
   - Define scope, window, success criteria, and rollback triggers.
2) Preflight
   - Confirm workload readiness:
     - PDBs and replicas
     - critical services identified
3) Execute
   - Cordon/drain nodes in controlled batches.
   - Upgrade one batch; verify; then continue.
4) Verify
   - Verify:
     - workloads rescheduled and healthy
     - key SLO signals stable
5) Monitor
   - Monitor for a defined window; record issues and follow-ups.

## Templates
- Maintenance plan: `assets/maintenance-plan.md`
- Drain checklist: `assets/drain-checklist.md`
- Risk matrix: `references/risk-matrix.md`

## Definition of Done
- Upgrade/maintenance completed (or aborted) with evidence.
- Workloads healthy and SLO signals stable.
- Follow-up actions filed for any degraded areas.

## Related skills
- `k8s-observability` for SLO-based verification.
- `k8s-deploy-workflow` for safe rollouts at the workload level.

