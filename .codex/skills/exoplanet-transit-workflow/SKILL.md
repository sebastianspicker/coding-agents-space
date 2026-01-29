---
name: exoplanet-transit-workflow
description: "Exoplanet transit analysis playbook. Use when turning photometric time-series into a defensible transit result: ingestion, detrending/systematics, baseline+transit modeling, fitting (LS/MCMC), posterior checks, injection-recovery, and a clear report."
---

# exoplanet-transit-workflow (Playbook)

Use this when analyzing transit photometry (space or ground based) in a way that is reproducible and honest about uncertainty and systematics.

## When to use (triggers)
- You have a light curve and want transit parameters (depth, duration, mid-transit time, impact parameter proxies).
- You need a workflow that separates “signal” from “instrument/atmosphere/systematics”.
- You’re preparing figures/tables for a paper or teaching material.

## Inputs / Outputs
- Inputs: time series (time, flux, flux_err), cadence, quality flags (if any), observing context (airmass/seeing for ground-based), prior info (ephemeris).
- Outputs: analysis notebook/plan + fit report (priors/posteriors) + injection-recovery results + decision log for detrending/systematics.

## Step sequence (Ingest -> Detrend -> Model -> Fit -> Check -> Inject -> Report)
1) Ingest
   - Record provenance: file/source, selection criteria, quality flags, time standard (e.g., BJD_TDB).
2) Detrend / systematics
   - Start simple; add regressors only with evidence.
   - Keep a decision log for each filtering/detrending step.
3) Model
   - Build a composite model: baseline (systematics + long-term trends) + transit.
   - Define parameters and constraints; write priors with rationale.
4) Fit
   - Do a quick deterministic fit first (least squares) to find a reasonable region.
   - Run MCMC (or similar) only after deterministic fit stabilizes and diagnostics are planned.
5) Posterior checks
   - Residual diagnostics, posterior predictive checks, parameter correlations, and chain diagnostics.
6) Inject-and-recover
   - Inject synthetic transits into “realistic” noise/systematics and verify recovery bias.
7) Report
   - Report parameters with credible intervals; separate observed results from modeling assumptions.

## Systematics discipline (non-negotiables)
- Every “cleaning” step must be logged (what, why, impact).
- Avoid tuning to maximize a desired result (predefine metrics like BIC/AIC or CV).
- Prefer robustness: outlier rules stated upfront; sensitivity analyses documented.

## Templates
- Analysis notebook outline: `assets/analysis-notebook-outline.md`
- Fit report template: `assets/fit-report.md`
- Injection-recovery plan: `assets/injection-recovery-plan.md`
- Posterior diagnostics checklist: `references/posterior-diagnostics.md`

## Definition of Done
- The analysis is reproducible from raw inputs and a single documented command/notebook.
- Fit report includes priors, diagnostics, and limitations.
- Injection-recovery demonstrates detection/recovery behavior (or documents why it wasn’t feasible).

## Related skills
- `bayesian-inference-for-astro` for priors/diagnostics discipline.
- `uncertainty-propagation-and-units` for units/time standards and derived quantities.
- `astro-paper-claims-and-figures` for claim→evidence→figure workflow.

