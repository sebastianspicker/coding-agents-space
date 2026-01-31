---
name: k8s-observability
description: "Kubernetes observability playbook. Use when instrumenting and operating workloads with Prometheus/Grafana/OTel patterns: golden signals, kube-state-metrics usage, SLO/burn-rate alerts, runbook links per alert, and correlation across logs/metrics/traces."
---

# k8s-observability (Playbook)

Use this to make Kubernetes workloads observable enough to operate: dashboards, alerts, and traces that are actionable.

## When to use (triggers)
- You need SLO-driven alerts and runbooks for a service on Kubernetes.
- You can’t debug incidents due to missing correlation across logs/metrics/traces.
- You’re rolling out OpenTelemetry in-cluster (collector patterns).

## Inputs / Outputs
- Inputs: workload inventory, SLIs/SLOs, current telemetry stack, namespaces/ownership, incident history.
- Outputs: SLO sheet + alert specs + dashboard checklist + rollout plan + evidence of signals working.

## Step sequence (Define -> Instrument -> Dashboard -> Alert -> Runbook -> Verify)
1) Define
   - Pick user-facing objectives and SLIs (latency/error/availability).
2) Instrument
   - Ensure:
     - request metrics (rate, errors, latency)
     - resource saturation metrics
     - correlation IDs in logs and traces
3) Dashboard
   - Build dashboards around the “golden signals” and top dependencies.
4) Alert
   - Use symptom-first alerts (SLO burn, error rate, latency) and avoid noise.
5) Runbook
   - Link a runbook to every alert (even if only a template).
6) Verify
   - Simulate a controlled failure and confirm signals + runbook usefulness.

## Prometheus/Grafana patterns (high-level)
- Prefer low-cardinality labels; bound dimensions like route/tenant.
- Track:
  - errors by class (4xx vs 5xx, domain error codes)
  - latency percentiles (p50/p95/p99)
  - saturation (CPU/memory, queue depth, DB connections)
- Use kube-state-metrics for object-level signals (replicas, readiness, restarts).

## Correlation guidance
- Metrics: include stable identifiers (service, namespace, version).
- Logs: include `request_id` and `trace_id` (if tracing enabled).
- Traces: propagate trace context across service boundaries.

## Templates
- SLO sheet: `assets/slo-sheet.md`
- Alert spec: `assets/alert-spec.md`
- Dashboard checklist: `assets/dashboard-checklist.md`
- Instrumentation rollout plan: `assets/instrumentation-rollout-plan.md`
- OTel patterns: `references/otel-patterns.md`

## Definition of Done
- SLOs and alerts are defined with owners and runbook links.
- Dashboards and alerts are actionable (tested via a controlled failure).
- Correlation across logs/metrics/traces works for at least one end-to-end request.

## Related skills
- `ops-observability` for general instrumentation and alert quality.
- `ops-incident-response` and `ops-postmortem` for operational workflows.
