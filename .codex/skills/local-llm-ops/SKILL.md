---
name: local-llm-ops
description: "Local LLM operations playbook. Use when running LLMs locally/on-prem (resource sizing, concurrency, latency/cost measurement, caching, privacy boundaries, upgrades, fallbacks) with a deployment checklist and benchmark log."
---

# local-llm-ops (Playbook)

Use this to operate local or self-hosted LLM inference reliably and safely (performance, privacy, upgrades, and fallbacks).

## When to use (triggers)
- Standing up a local/on-prem model server.
- Latency/throughput problems or unstable memory usage.
- Upgrading models/weights or changing serving configs.
- Defining privacy boundaries for prompts and logs.

## Inputs / Outputs
- Inputs: model(s), hardware constraints (CPU/GPU/RAM/VRAM), expected QPS/concurrency, latency target, privacy policy, failure modes.
- Outputs: deployment plan + benchmark results + monitoring checklist + rollback plan.

## Step sequence (Plan -> Deploy -> Benchmark -> Monitor -> Upgrade)
1) Plan
   - Define SLOs: latency p95, throughput, error rate.
   - Define privacy boundaries (what can be logged/stored).
2) Deploy
   - Configure serving parameters (batching, context length, quantization) intentionally.
3) Benchmark
   - Run a small benchmark suite: cold start, warm, concurrency sweep.
4) Monitor
   - Track CPU/GPU utilization, memory/VRAM, queue depth, error rates.
5) Upgrade
   - Upgrade with canary and rollback plan; re-run benchmarks.

## Privacy rules
- Treat prompts and completions as potentially sensitive.
- Avoid logging raw prompts by default; prefer hashed IDs and minimal metadata.
- Separate “debug mode” logging with explicit opt-in and retention limits.

## Templates
- Deployment checklist: `assets/deployment-checklist.md`
- Benchmark log: `assets/benchmark-log.md`
- Monitoring checklist: `references/monitoring.md`

## Definition of Done
- Benchmarks recorded for baseline hardware/config.
- Monitoring and privacy posture documented.
- Upgrade/rollback process exists and is tested at least once in non-prod.

## Related skills
- `llm-eval-harness` and `rag-workflow` for quality regressions and grounding.
- `security-secrets-hygiene` for safe config handling.

