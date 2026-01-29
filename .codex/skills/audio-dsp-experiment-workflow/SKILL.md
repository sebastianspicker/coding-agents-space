---
name: audio-dsp-experiment-workflow
description: "Audio DSP experiment playbook. Use when running signal-processing experiments: hypothesis, signal chain design, test signals, objective metrics (SNR/THD/crest factor), ABX listening tests, and reproducible result reporting."
---

# audio-dsp-experiment-workflow (Playbook)

Use this to run DSP experiments with both objective metrics and (when appropriate) listening tests, keeping results reproducible.

## When to use (triggers)
- Comparing two DSP methods (filters, compressors, pitch shifting, denoising).
- Validating “sounds better” claims with ABX or structured listening.
- Preparing a research/teaching artifact (plots, tables, audio examples).

## Inputs / Outputs
- Inputs: hypothesis, signal chain definition, test signals/datasets, metric choices, listening test constraints.
- Outputs: experiment spec + results table + listening test protocol + reproducible artifacts.

## Step sequence (Hypothesize -> Design -> Measure -> Listen -> Report -> Archive)
1) Hypothesize
   - State what improvement is expected and under what conditions.
2) Design
   - Define the signal chain and parameters; predefine metrics and acceptance criteria.
3) Measure
   - Run objective metrics; record versions and parameters.
4) Listen
   - If relevant, run a small ABX-style protocol; record conditions.
5) Report
   - Report metrics, failure cases, and limitations.
6) Archive
   - Store audio examples and config/results with provenance.

## Templates
- Experiment spec: `assets/experiment-spec.md`
- Results table (CSV): `assets/results-table.csv`
- Listening test protocol: `assets/listening-test-protocol.md`
- Metrics notes: `references/metrics.md`

## Definition of Done
- Experiment is reproducible from spec + code/versioned config.
- Metrics and listening results are reported with limitations.
- Audio examples are labeled and stored responsibly (no sensitive recordings without consent).

