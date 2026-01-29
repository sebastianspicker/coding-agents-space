---
name: perf-load-testing
description: "Performance load testing playbook. Use when planning and executing load/performance tests (tool-agnostic): SLO-based pass criteria, environment parity, safe traffic generation, result reporting, and regression gating for services and web apps."
---

# perf-load-testing (Playbook)

Use this to run load tests that are safe, comparable, and tied to SLOs.

## When to use (triggers)
- You changed performance-sensitive code paths.
- You need capacity planning or sizing evidence.
- You suspect production-only performance regressions.

## Inputs / Outputs
- Inputs: target endpoints, expected traffic mix, SLOs, test environment, safety constraints.
- Outputs: test plan + results report + decision (ship/block) with evidence.

## Step sequence (Plan -> Baseline -> Run -> Analyze -> Regress)
1) Plan
   - Define traffic mix and pass criteria (SLO-based).
   - Ensure you have permission and safe constraints.
2) Baseline
   - Capture baseline results for comparison.
3) Run
   - Ramp up gradually; monitor errors and saturation; abort safely if needed.
4) Analyze
   - Analyze latency/error/saturation and bottlenecks (DB, cache, CPU, GC).
5) Regress
   - Turn key scenarios into regression tests and run them on changes.

## Templates
- Load test plan: `assets/test-plan.md`
- Results report: `assets/results-report.md`
- Metrics glossary: `references/metrics.md`

## Definition of Done
- Pass criteria defined and results reported transparently.
- Safety controls used (ramp, abort triggers).
- Regression gating added for critical scenarios.

## Related skills
- `ops-observability` and `k8s-observability` for measurement.
- `postgres-ops` for DB bottleneck triage.
