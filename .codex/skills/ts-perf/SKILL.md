# ts-perf (Playbook)

Use this when you need to debug or improve performance in a TS/JS codebase with evidence (profiling/benchmarks).

## When to use (triggers)
- Hot paths are slow, CPU usage is high, memory/GC churn is suspected.
- A performance regression is reported.
- You need to justify an optimization with measurements.

## Inputs / Outputs
- Inputs: workload description, baseline numbers, environment details, suspected hotspots.
- Outputs: profile evidence, minimal patches, before/after measurements.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Pick a realistic workload and capture baseline (time, CPU, memory).
2) Diagnose
   - Use profiling (Node inspector / sampling) to identify hotspots.
   - Validate assumptions (I/O vs CPU, allocations, serialization).
3) Fix
   - Optimize the smallest hotspot first.
   - Prefer algorithmic wins over micro-optimizations.
4) Verify
   - Re-run benchmarks/profiles; ensure correctness via tests.

## Optional: runtime skill usage
`ts-optimize` can emit perf-oriented recommendations (`recommendFocus: ["perf", "numerics"]`) and hotspot heuristics (debug complex).
See `.codex/skills/ts-optimize/SKILL.md`.

## Definition of Done
- Baseline and after numbers are captured and comparable.
- Change is minimal and justified by evidence.
- Correctness is verified (tests/typecheck).
