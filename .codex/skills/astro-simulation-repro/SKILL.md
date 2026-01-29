---
name: astro-simulation-repro
description: "Astronomy simulation reproducibility playbook. Use when building simulation pipelines (parameter sweeps, RNG seeding, deterministic outputs, performance gates) and validating results against analytic limits with experiment specs and result tables."
---

# astro-simulation-repro (Playbook)

Use this to build simulations that are reproducible, testable, and suitable for research and teaching artifacts.

## When to use (triggers)
- Building Monte Carlo simulations (transit detectability, HZ Monte Carlo, population inference baselines).
- Running parameter sweeps or comparing models.
- Preparing a simulation-based figure/table for a paper or classroom.

## Inputs / Outputs
- Inputs: model definition, parameter ranges, RNG requirements, compute budget, validation targets (analytic limits/benchmarks).
- Outputs: experiment spec + deterministic result artifacts + validation notes + performance budget.

## Step sequence (Specify -> Seed -> Sweep -> Validate -> Record)
1) Specify
   - Write an experiment spec: inputs, outputs, and acceptance criteria.
2) Seed
   - Define RNG seeding strategy and record it for every run.
3) Sweep
   - Run parameter sweeps with stable output formats.
4) Validate
   - Validate vs analytic limits or known baselines; add regression tests.
5) Record
   - Store results tables and summarize performance.

## Determinism rules
- Every run records:
  - code version
  - RNG seed(s)
  - parameters and ranges
  - environment details

## Templates
- Experiment spec: `assets/experiment-spec.md`
- Results table: `assets/results-table.csv`
- Validation checklist: `references/validation.md`

## Definition of Done
- A run can be reproduced exactly (or within defined stochastic tolerance).
- Outputs are stable and versioned.
- Validation against at least one analytic or baseline check exists.

## Related skills
- `uncertainty-propagation-and-units` for unit rigor.
- `astro-paper-claims-and-figures` for research outputs.

