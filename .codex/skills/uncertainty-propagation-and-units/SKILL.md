---
name: uncertainty-propagation-and-units
description: "Uncertainty propagation and units playbook. Use when enforcing units/dimensions, propagating measurement uncertainty (analytic or Monte Carlo), tracking significant figures, and writing unit tests for physical constraints and derived parameters."
---

# uncertainty-propagation-and-units (Playbook)

Use this to keep physics code honest: consistent units, defensible uncertainty propagation, and tests that catch dimension/constraint mistakes.

## When to use (triggers)
- You compute derived quantities (planet radius, equilibrium temperature, stellar density proxies).
- You combine measurements with uncertainties (and covariances).
- You suspect unit bugs or sign/scale issues in code.

## Inputs / Outputs
- Inputs: measurements (with units and uncertainties), derived formulas, correlation/covariance knowledge, reporting requirements.
- Outputs: units contract + derived parameter log + uncertainty propagation method and evidence (tests/plots).

## Step sequence (Contract -> Compute -> Propagate -> Validate -> Report)
1) Contract
   - Define canonical units and time standards for the project.
2) Compute
   - Implement derived quantity calculations with explicit unit handling.
3) Propagate
   - Choose analytic propagation when appropriate; otherwise Monte Carlo.
4) Validate
   - Validate against limiting cases and sanity bounds; add unit tests.
5) Report
   - Report values with appropriate significant figures and uncertainty intervals.

## Templates
- Units contract: `assets/units-contract.md`
- Derived parameter log: `assets/derived-parameter-log.md`
- Validation checklist: `references/validation.md`

## Definition of Done
- Units/time standards are explicit and consistently used.
- Uncertainty propagation method is documented and reproducible.
- Physical constraints and limiting-case tests exist for key formulas.

## Related skills
- `bayesian-inference-for-astro` and domain workflows (transits/EBs).

