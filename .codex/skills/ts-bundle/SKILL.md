---
name: ts-bundle
description: "Playbook for ts-bundle. Use when Bundle size regressions; Tree-shaking not working (unexpected large deps in output); Slow load times traced to JS payload."
---

# ts-bundle (Playbook)

Use this when you need to debug web/bundle size issues, tree-shaking failures, or slow page loads in TS/JS projects.

## When to use (triggers)
- Bundle size regressions.
- Tree-shaking not working (unexpected large deps in output).
- Slow load times traced to JS payload.

## Inputs / Outputs
- Inputs: bundler/tooling (webpack/vite/rollup/next), baseline bundle stats, target pages/entries.
- Outputs: bundle report deltas, minimal patches, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: capture a baseline bundle report (or build output size).
2) Diagnose: identify the biggest contributors and why they are included.
3) Fix: reduce imports, avoid side effects, split code, or replace heavy deps.
4) Verify: rebuild, compare bundle stats, ensure runtime correctness.

## Optional: runtime skill usage
`ts-optimize` can emit bundle/web recommendations (`recommendFocus: ["web", "bundle"]`).
See `.codex/skills/ts-optimize/SKILL.md`.

## Definition of Done
- Bundle size regression is explained and addressed.
- Deltas are measured (before/after).
- Changes are scoped and verified.
