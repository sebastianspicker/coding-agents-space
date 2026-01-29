---
name: eclipsing-binary-analysis
description: "Eclipsing binary analysis playbook. Use when deriving ephemerides, building O–C diagrams, fitting eclipse models (geometry + limb darkening policy), handling degeneracies, and reporting results with explicit assumptions and residual analysis."
---

# eclipsing-binary-analysis (Playbook)

Use this when analyzing eclipsing binary light curves with a reproducible ephemeris/O–C workflow and a clear separation of evidence vs modeling assumptions.

## When to use (triggers)
- You have multiple eclipse timings and need ephemeris refinement.
- You suspect period changes, apsidal motion, or timing variations.
- You need a defensible model fit and residual analysis.

## Inputs / Outputs
- Inputs: eclipse times (with uncertainties), light curves (optional), time standard, segment metadata (seasons/quarters).
- Outputs: O–C report + fit summary + assumptions log + residual diagnostics.

## Step sequence (Ephemeris -> O–C -> Model -> Fit -> Diagnose -> Report)
1) Ephemeris
   - Establish a baseline ephemeris and time standard.
2) O–C
   - Compute O–C residuals; visualize vs time and cycle count.
3) Model
   - Choose model complexity based on evidence (don’t overfit).
4) Fit
   - Fit with stated priors/constraints; document degeneracies.
5) Diagnose
   - Residual structure and segment consistency checks.
6) Report
   - Report ephemeris updates and timing variation claims with uncertainty and limitations.

## Degeneracy discipline (examples)
- Inclination vs radius ratio vs limb darkening assumptions.
- Spots/systematics masquerading as eclipse shape changes.
- Timing uncertainties vs correlated noise.

## Templates
- O–C report: `assets/oc-report.md`
- Assumptions vs evidence log: `assets/assumptions-vs-evidence.md`
- Residual checklist: `references/residual-checklist.md`

## Definition of Done
- Ephemeris and O–C computation are reproducible and documented.
- Model choice and assumptions are explicit.
- Claims about timing variations are supported by evidence (or explicitly uncertain).

## Related skills
- `astro-time-series-period-search` for initial period candidates and alias handling.
- `bayesian-inference-for-astro` for fit diagnostics and reporting.

