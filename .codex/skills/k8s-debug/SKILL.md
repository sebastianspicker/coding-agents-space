---
name: k8s-debug
description: "Kubernetes debugging playbook. Use when diagnosing pod/node/workload failures (CrashLoopBackOff, ImagePullBackOff, probes, scheduling, resource limits) with a reproducible kubectl-first evidence trail and safe rollback options."
---

# k8s-debug (Playbook)

Use this to debug Kubernetes issues with a repeatable “scope -> evidence -> hypothesis -> fix -> verify” flow.

## When to use (triggers)
- Pods stuck in `CrashLoopBackOff`, `ImagePullBackOff`, `CreateContainerConfigError`.
- Deployments/StatefulSets not progressing or flapping.
- Probes failing (liveness/readiness/startup).
- Scheduling failures (Pending pods) or node pressure/evictions.
- “Works locally, fails in cluster” runtime configuration issues.

## Inputs / Outputs
- Inputs: kubeconfig context, namespace(s), workload name, symptom timeline, recent deploy/config changes.
- Outputs: debug log + minimal fix (or rollback) + verification commands + captured evidence.

## Step sequence (Scope -> Observe -> Explain -> Fix -> Verify)
1) Scope
   - Confirm cluster + context: `kubectl config current-context`
   - Identify namespace/workload and the *first* time it broke (deploy SHA/tag if possible).
2) Observe (no changes yet)
   - Collect: status, events, logs, and the exact failing condition.
3) Explain
   - Write one primary hypothesis and 1–2 alternatives (don’t shotgun).
4) Fix
   - Prefer reversible actions (rollback, config revert, scale to zero).
5) Verify
   - Verify rollout health and that the symptom is gone.
   - Record evidence (commands + outputs) in the debug log.

## Fast triage map (symptom -> likely areas)
- `ImagePullBackOff`: registry creds, image tag/digest, network egress, platform arch mismatch.
- `CrashLoopBackOff`: app crash, missing env/secret/config, wrong command/args, OOMKilled, failing dependency.
- `CreateContainerConfigError`: missing secret/configmap, invalid env var ref, volume mount issues.
- `Pending`: resources (CPU/mem), node selectors/taints, PVC binding, quotas, affinity/anti-affinity.
- Probe failures: wrong port/path, slow startup, dependency readiness, timeouts.
- `OOMKilled`: memory limit too low, leaks, sudden load, JVM/node tuning.

## Evidence checklist (kubectl-first)
- Workload + pods:
  - `kubectl -n <ns> get deploy,sts,ds,job,cronjob`
  - `kubectl -n <ns> get pods -o wide`
- Events (often the fastest signal):
  - `kubectl -n <ns> get events --sort-by=.lastTimestamp | tail -n 50`
- Describe:
  - `kubectl -n <ns> describe pod <pod>`
  - `kubectl -n <ns> describe deploy <name>`
- Logs:
  - `kubectl -n <ns> logs <pod> --all-containers --tail=200`
  - `kubectl -n <ns> logs <pod> --previous --tail=200` (for CrashLoop)
- Node pressure:
  - `kubectl get nodes -o wide`
  - `kubectl describe node <node>`

## Safe fix patterns
- Rollout undo:
  - `kubectl -n <ns> rollout history deploy/<name>`
  - `kubectl -n <ns> rollout undo deploy/<name>`
- Config fix without redeploying code:
  - patch configmap/secret references, env vars, or probes (minimize diff).
- Resource tuning:
  - raise memory limit only with justification; add metrics/log evidence if possible.

## Templates
- Debug log (Symptom→Hypothesis→Command→Observation): `assets/k8s-debug-log.md`
- Quick command set: `references/kubectl-cheatsheet.md`

## Definition of Done
- Root cause is identified (or explicitly “unknown”) with evidence captured.
- Fix is minimal and reversible (or rollback applied) and verified via rollout health.
- A regression prevention note exists (alert/test/runbook update suggestion).

## Related skills
- `k8s-networking-debug` for cluster networking/DNS/Ingress issues.
- `k8s-deploy-workflow` for safe rollouts and verification gates.
- `ops-observability` for adding signals after repeated incidents.

