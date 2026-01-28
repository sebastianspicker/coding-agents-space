# ps-recommend (Playbook)

Use this when you have PowerShell recommendations (security/compat/perf/style) and need to convert them into verified tasks.

## When to use (triggers)
- You have guidance but no concrete plan.
- You need to modernize scripts safely (compat, security).
- You want to avoid uncontrolled refactors.

## Inputs / Outputs
- Inputs: recommendation list, scope, constraints, verification commands.
- Outputs: prioritized task list, patches, verification evidence, accepted-risk notes.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: baseline checks (lint/analyzer + smoke run + tests if present).
2) Diagnose: classify recommendations by risk and impact; pick top items.
3) Fix: implement changes in small, reviewable patches.
4) Verify: rerun baseline checks and ensure scripts behave the same (unless intended).

## Optional: use the runtime skill in this repo
`skills/dev-tools/ps1-optimize` supports `recommend` with `recommendFocus` (`security|compat|perf|style`).
See `.codex/skills/ps1-optimize/SKILL.md`.

## Definition of Done
- Recommendations are turned into concrete tasks with verification.
- Changes are scoped and measured (where applicable).
- Any rejected recommendations have a documented reason.
