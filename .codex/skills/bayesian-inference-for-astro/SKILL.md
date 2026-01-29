---
name: bayesian-inference-for-astro
description: "Bayesian inference for astronomy playbook. Use when fitting astrophysical models with explicit priors, identifiability checks, posterior predictive checks, chain diagnostics, and careful reporting of credible intervals and derived quantities."
---

# bayesian-inference-for-astro (Playbook)

Use this when Bayesian modeling is appropriate and you need discipline: explicit priors, diagnostics, and honest reporting.

## When to use (triggers)
- Transit fits, eclipse fits, RV fits, variability models with strong degeneracies.
- You need uncertainty quantification beyond a point estimate.
- You need to report credible intervals and propagate into derived quantities.

## Inputs / Outputs
- Inputs: likelihood choice/noise model, parameterization, prior knowledge, computational budget.
- Outputs: prior sheet + diagnostics checklist results + posterior summaries + posterior predictive checks notes.

## Step sequence (Specify -> Prior -> Identify -> Sample -> Check -> Report)
1) Specify
   - Write down the generative story and likelihood assumptions.
2) Prior
   - Choose priors with explicit rationale and sensitivity expectations.
3) Identify
   - Check identifiability and degeneracies before heavy sampling.
4) Sample
   - Run sampler with recorded settings; keep random seeds and versions.
5) Check
   - Chain diagnostics and posterior predictive checks.
6) Report
   - Report credible intervals, derived quantities, and limitations.

## Practical rules
- If priors dominate the posterior, say so and justify.
- Prefer reparameterization over “more sampling” for poor mixing.
- Separate model inadequacy from parameter uncertainty.

## Templates
- Prior sheet: `assets/prior-sheet.md`
- Diagnostics checklist: `assets/diagnostics-checklist.md`
- Reporting checklist: `references/reporting.md`

## Definition of Done
- Priors and likelihood are stated and reviewed.
- Diagnostics support the validity of posterior summaries (or limitations documented).
- Derived quantities are computed with propagated uncertainty (or justified otherwise).

## Related skills
- `uncertainty-propagation-and-units` for unit/derived quantity rigor.
- Domain workflows like `exoplanet-transit-workflow` and `eclipsing-binary-analysis`.

