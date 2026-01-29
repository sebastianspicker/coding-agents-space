---
name: kustomize-workflow
description: "Kustomize workflow playbook. Use when managing Kubernetes manifests with bases/overlays, patches, generators, and render/diff/validate gates while keeping changes reviewable and environment-safe."
---

# kustomize-workflow (Playbook)

Use this to structure Kustomize projects and keep env diffs small, reviewable, and verifiable.

## When to use (triggers)
- Managing multiple environments with overlays.
- Applying patches to upstream/base manifests.
- Debugging “why does prod differ from staging?” drift.

## Inputs / Outputs
- Inputs: base manifests, overlays, target env, patch strategy, secret/config generation approach.
- Outputs: layout convention + rendered manifests + reviewed diff + apply plan + verification evidence.

## Step sequence (Structure -> Render -> Review -> Apply -> Verify)
1) Structure
   - Define a base and overlays; keep overlays minimal.
2) Render
   - Render final manifests for the target env.
3) Review
   - Review rendered diff; focus on selectors, service ports, probes, resources, ingress.
4) Apply
   - Apply rendered manifests (or via GitOps) with a rollback plan.
5) Verify
   - Rollout status + smoke checks; capture evidence.

## Generator cautions
- Prefer stable names; uncontrolled name hashing can cause noisy diffs.
- Treat generated secrets/config as sensitive; avoid committing real secrets.

## Templates
- Layout convention: `assets/kustomize-layout.md`
- Rendered-manifests verify checklist: `assets/rendered-verify-checklist.md`
- Patch patterns: `references/patch-patterns.md`

## Definition of Done
- Overlays are minimal and environment-focused.
- Rendered output is reviewed before apply.
- Rollout verified with evidence.

## Related skills
- `k8s-deploy-workflow` and `core-verify-before-claim`.

