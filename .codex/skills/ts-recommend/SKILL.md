---
name: ts-recommend
description: "Playbook for ts-recommend. Use when you have a list of suggestions but no concrete plan; you need to prioritize and validate changes with evidence; you want to avoid turning a recommendation pass into a refactor spree."
---

# ts-recommend (Playbook)

Use this when you have "recommendations" (from humans, linters, profilers, or `ts-optimize`) and need to turn them into verified tasks.

## When to use (triggers)
- You have a list of suggestions but no concrete plan.
- You need to prioritize and validate changes with evidence.
- You want to avoid turning a recommendation pass into a refactor spree.

## Inputs / Outputs
- Inputs: recommendation list, scope, constraints, verification commands.
- Outputs: prioritized task list, patches, verification evidence, and "accepted risks" notes.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: baseline measurements/checks (build/test/typecheck/perf).
2) Diagnose: classify recommendations by impact (correctness, perf, DX, bundle) and cost/risk.
3) Fix: implement only the top items; keep each change independently verifiable.
4) Verify: re-run the baseline checks and capture deltas.

## Optional: use the runtime skill in this repo
`skills/dev-tools/ts-optimize` supports `recommend` with `recommendFocus`.

Example:
```json
{
  "project": { "root": "/workspace", "tsconfigPath": "/workspace/tsconfig.json" },
  "actions": [{ "type": "recommend", "recommendFocus": ["perf", "types", "bundle", "testing"] }]
}
```

## Definition of Done
- Recommendations are translated into concrete tasks with owners and verification.
- Changes are small, reviewable, and measured (where applicable).
- Any rejected/parked recommendations have a documented reason.
