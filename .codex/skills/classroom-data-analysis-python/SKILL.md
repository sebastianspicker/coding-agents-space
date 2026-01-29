---
name: classroom-data-analysis-python
description: "Classroom data analysis in Python playbook. Use when analyzing messy student/lab data: robust cleaning, uncertainty reporting, plotting standards, reproducible notebooks, and auto-generated handouts/reports with privacy-aware outputs."
---

# classroom-data-analysis-python (Playbook)

Use this to analyze classroom/lab data in a way that is robust, reproducible, and easy to grade/teach from.

## When to use (triggers)
- Data is inconsistent across devices/teams (missing columns, weird units, outliers).
- You need clear plots and a short report for students or graders.
- You want to auto-generate handouts from results.

## Inputs / Outputs
- Inputs: exported data files, data dictionary, expected units, privacy constraints (no personal identifiers).
- Outputs: notebook skeleton + cleaned dataset + summary plots + grading-friendly summary tables/report.

## Step sequence (Ingest -> Clean -> Validate -> Summarize -> Export -> Handout)
1) Ingest
   - Load data with schema checks and explicit units.
2) Clean
   - Apply robust cleaning rules; record how many rows changed/dropped.
3) Validate
   - Sanity checks (ranges, monotonic time, unit consistency).
4) Summarize
   - Compute key summaries with uncertainty; create consistent plots.
5) Export
   - Export cleaned data and results tables with stable filenames.
6) Handout
   - Generate a short, privacy-safe report/handout for sharing.

## Templates
- Notebook skeleton: `assets/notebook-skeleton.md`
- Plotting checklist: `references/plotting.md`
- Grading summary template: `assets/grading-summary.md`

## Definition of Done
- Analysis is reproducible and runs end-to-end on fresh data.
- Outputs are privacy-safe and grading-friendly.
- Uncertainty and limitations are explained at the appropriate level.

## Related skills
- `phyphox-lab-workflow` and `uncertainty-propagation-and-units`.

