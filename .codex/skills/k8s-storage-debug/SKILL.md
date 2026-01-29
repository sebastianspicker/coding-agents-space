---
name: k8s-storage-debug
description: "Kubernetes storage debugging playbook. Use when diagnosing PVC/PV/StorageClass and CSI issues: pending binds, stuck mounts/attach-detach, filesystem permissions, expansion, reclaim policy, and safe recovery steps prioritizing data safety."
---

# k8s-storage-debug (Playbook)

Use this to debug Kubernetes storage issues with a “data safety first” mindset: collect evidence, avoid destructive actions, and use incremental fixes.

## When to use (triggers)
- Pods stuck `Pending` due to PVC issues.
- Pods stuck `ContainerCreating` with mount/attach errors.
- Permissions errors accessing mounted volumes.
- Volume expansion or reclaim behavior confusion.

## Inputs / Outputs
- Inputs: namespace, workload/pod, PVC name(s), storage class, CSI driver, node details, data criticality.
- Outputs: storage incident log + recovery plan + verification evidence.

## Step sequence (Freeze -> Observe -> Localize -> Recover -> Verify)
1) Freeze (data safety)
   - Avoid deleting PVC/PV unless you fully understand reclaim policy and backups.
2) Observe
   - Collect: PVC/PV status, events, pod describe output, node info.
3) Localize
   - Determine failure domain:
     - binding/provisioning (PVC/PV/SC)
     - attach/detach (node/CSI)
     - mount/filesystem (fs/permissions)
4) Recover
   - Apply the minimal safe fix (policy/config) and document the rationale.
5) Verify
   - Verify pod starts and data is intact; record evidence.

## Common failure modes
- PVC Pending:
  - no matching StorageClass/provisioner
  - capacity/quotas or topology constraints
- Attach/mount failures:
  - CSI driver issues
  - node pressure or permissions
- Permissions:
  - `securityContext`, `runAsUser`, `fsGroup` mismatch with volume ownership

## Templates
- Storage incident log: `assets/storage-incident-log.md`
- Recovery checklist: `assets/recovery-checklist.md`
- Safe steps decision tree: `assets/safe-steps-decision-tree.md`
- Command snippets: `references/commands.md`

## Definition of Done
- Root cause localized with evidence.
- Recovery steps prioritized data safety and avoided destructive actions.
- Workload verified and follow-ups created (monitoring, runbook, capacity planning).

## Related skills
- `linux-storage-debug` for filesystem/permissions concepts.
- `k8s-debug` for general workload debugging.

