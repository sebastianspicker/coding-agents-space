---
name: helm-release-workflow
description: "Helm release workflow playbook. Use when deploying or upgrading Helm charts with safe values layering, chart pinning, render/diff/validate gates, and rollback-friendly releases."
---

# helm-release-workflow (Playbook)

Use this to manage Helm-based deployments with reproducible rendering, reviewable diffs, and safe upgrades.

## When to use (triggers)
- Installing/upgrading a Helm release.
- Managing multiple environments with layered values.
- Debugging Helm-rendered manifests or drift between environments.

## Inputs / Outputs
- Inputs: chart source/version, values per environment, target namespace/cluster, release name, upgrade risk.
- Outputs: render/diff evidence + upgrade plan + rollback steps + verification results.

## Step sequence (Pin -> Render -> Diff -> Upgrade -> Verify)
1) Pin
   - Pin chart version (and dependencies) explicitly; record it.
2) Render
   - Render manifests deterministically for review (template/manifest output).
3) Diff
   - Review changes before applying (focus on selectors, probes, resources, ingress, secrets refs).
4) Upgrade
   - Upgrade with a defined timeout and atomic/rollback posture where appropriate.
5) Verify
   - Verify rollout health + smoke checks; capture evidence.

## Values layering guidance
- Keep a base `values.yaml` and environment-specific overlays (e.g., `values.prod.yaml`).
- Avoid embedding secrets in values; use external secret mechanisms or separate secure channels.
- Prefer explicit overrides over implicit defaults.

## Templates
- Values layout convention: `assets/values-layout.md`
- Release checklist: `assets/helm-release-checklist.md`
- Render/verify notes: `references/render-verify.md`

## Definition of Done
- Chart/version and values inputs are pinned and recorded.
- Rendered diff was reviewed before upgrade.
- Upgrade verified with rollout health + smoke checks.

## Related skills
- `k8s-deploy-workflow` for rollout planning and verify gates.
- `k8s-debug` for failures during upgrade.

