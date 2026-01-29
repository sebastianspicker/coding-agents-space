---
name: astro-time-series-period-search
description: "Astronomical time-series period search playbook. Use when estimating periodicities (Lomb–Scargle/GLS) with window function/alias analysis, false-alarm assessment (bootstrap), harmonic checks, period refinement, and phase-folding with reproducible logs."
---

# astro-time-series-period-search (Playbook)

Use this to search for periods in unevenly sampled astronomical time series without fooling yourself with aliases or leakage.

## When to use (triggers)
- Variable stars, eclipsing binaries, rotation signals, activity cycles.
- You need periodogram-based candidate periods and a defensible selection rationale.

## Inputs / Outputs
- Inputs: time series (time, value, uncertainty), time standard, sampling characteristics, any quality flags.
- Outputs: periodogram log + alias checklist results + selected period + phase-folded plots (or equivalents) + uncertainty estimate.

## Step sequence (Prepare -> Search -> Diagnose -> Refine -> Validate -> Report)
1) Prepare
   - Normalize and document units/time standard.
   - Define filtering/outlier policy and record it.
2) Search
   - Compute LS/GLS over a justified frequency range.
3) Diagnose aliases
   - Analyze window function and common alias patterns.
4) Refine
   - Zoom around candidate peaks; check harmonics/subharmonics.
5) Validate
   - Estimate false alarm probability (bootstrap/permutation) or a robust alternative.
   - Confirm the period produces coherent phase-folding and stable residual structure.
6) Report
   - Report the selected period with uncertainty and known ambiguities/aliases.

## Practical cautions
- Don’t pick the “largest peak” without alias/window analysis.
- Sampling + gaps can dominate apparent periodicity; record sampling explicitly.
- For non-sinusoidal signals (e.g., eclipses), expect harmonics to matter.

## Templates
- Periodogram log: `assets/periodogram-log.md`
- Alias checklist: `assets/alias-checklist.md`
- Frequency range guidance: `references/frequency-range.md`

## Definition of Done
- Candidate periods are evaluated with window/alias reasoning.
- False-alarm (or alternative significance) assessment is recorded.
- Final period choice is justified and reproducible.

## Related skills
- `eclipsing-binary-analysis` for EB-specific ephemeris/O–C workflows.
- `bayesian-inference-for-astro` for principled uncertainty reporting.

