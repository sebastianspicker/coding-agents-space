---
name: photometry-systematics-debug
description: "Photometry systematics debugging playbook. Use when diagnosing and mitigating trends in light curves (airmass, seeing, temperature, pointing, aperture/comp stars, outliers) with a decision table and uncertainty sanity checks."
---

# photometry-systematics-debug (Playbook)

Use this when photometric time series show trends that could mask or mimic astrophysical signals.

## When to use (triggers)
- You see baseline drifts correlated with observing conditions.
- Detrending choices change the scientific conclusion.
- You need to justify systematics handling in a report/paper/lesson.

## Inputs / Outputs
- Inputs: light curve, auxiliary variables (airmass, seeing/FWHM, sky background, centroid position, temperature), pipeline metadata, comparison star set.
- Outputs: systematics table (feature→diagnostic→decision) + documented cleaning/detrending choices + uncertainty sanity checks.

## Step sequence (Observe -> Correlate -> Decide -> Refit -> Stress-test)
1) Observe
   - Plot raw light curve + auxiliaries over time.
2) Correlate
   - Check correlations between flux residuals and each auxiliary variable.
3) Decide
   - Record decisions in the systematics table (include “do nothing” options).
4) Refit
   - Apply minimal detrending and refit the scientific model (transit/periodic model).
5) Stress-test
   - Sensitivity to aperture choice, comparison stars, and outlier policy.

## Uncertainty sanity checks
- Are reported errors consistent with residual scatter?
- Do uncertainties vary realistically with conditions (airmass/sky)?
- If errors are underestimated, record an inflation model (and justification).

## Templates
- Systematics decision table: `assets/systematics-table.md`
- Outlier policy template: `references/outlier-policy.md`
- Uncertainty checklist: `references/uncertainty-checks.md`

## Definition of Done
- Each detrending choice has a recorded motivation and impact.
- The final result is stable under reasonable analysis variations (or instability is documented).

## Related skills
- `exoplanet-transit-workflow` and `astro-time-series-period-search`.

