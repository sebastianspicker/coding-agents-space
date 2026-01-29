---
name: astro-variability-classification
description: "Astronomical variability classification playbook. Use when building baseline classifiers for variable sources: feature extraction, leakage checks, time-aware splits, evaluation protocol, and a dataset card documenting provenance and limitations."
---

# astro-variability-classification (Playbook)

Use this to classify variable sources with a workflow that avoids common ML pitfalls (leakage, non-iid splits, and overclaiming).

## When to use (triggers)
- You have labeled variability classes (or a weak label set) and want a baseline model.
- You need a reproducible eval protocol and a dataset card.

## Inputs / Outputs
- Inputs: time series per source, labels (class taxonomy), metadata (colors, magnitude proxies), mission/observatory constraints.
- Outputs: dataset card + evaluation protocol + baseline model report + error analysis.

## Step sequence (Define -> Build -> Split -> Train -> Evaluate -> Analyze)
1) Define
   - Define taxonomy and what counts as “unknown/other”.
2) Build
   - Extract features; store feature definitions and versions.
3) Split (time-aware)
   - Prefer splits that prevent leakage (by source, by sky region, by time segment).
4) Train
   - Start with simple baselines; tune conservatively.
5) Evaluate
   - Report metrics with confidence; include per-class breakdown and confusion matrix.
6) Analyze
   - Perform error analysis and document failure modes.

## Leakage checklist (must address)
- No same source in train and test.
- No future information used in training features for “past” evaluation.
- Metadata proxies that encode label must be documented and justified.

## Templates
- Dataset card: `assets/dataset-card.md`
- Evaluation protocol: `assets/evaluation-protocol.md`
- Feature registry: `references/feature-registry.md`

## Definition of Done
- Dataset card and evaluation protocol are complete.
- Baseline performance is reported with caveats and error analysis.
- A reproducible pipeline exists (inputs, versioned features, fixed splits).

## Related skills
- `astro-time-series-period-search` for period features and alias handling discipline.
- `core-verify-before-claim` for reporting evidence and avoiding overclaims.

