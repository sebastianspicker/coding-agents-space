---
name: space-mission-lightcurves
description: "Space mission lightcurve workflow playbook. Use when working with Kepler/TESS-like products: querying/downloading, handling quality flags, cadence issues, stitching sectors/quarters, contamination notes, and recording provenance and decisions."
---

# space-mission-lightcurves (Playbook)

Use this when ingesting and preparing light curves from space mission archives for analysis and publication-quality provenance.

## When to use (triggers)
- Working with TESS/Kepler/K2-like light curve products.
- Stitching multiple segments (sectors/quarters) and managing discontinuities.
- Deciding how to apply quality flags and contamination corrections.

## Inputs / Outputs
- Inputs: target identifier(s), archive source/query parameters, product type (SAP/PDCSAP equivalents), cadence, flags.
- Outputs: provenance record + quality-flag decision log + stitched light curve artifacts (or reproducible code) + contamination notes.

## Step sequence (Query -> Download -> Filter -> Stitch -> Sanity-check -> Record)
1) Query
   - Record query parameters and identifiers used.
2) Download
   - Cache downloads and record checksums/versions if possible.
3) Filter
   - Apply quality flags with a decision log; avoid silent dropping.
4) Stitch
   - Handle offsets between segments; record algorithm/parameters.
5) Sanity-check
   - Check for discontinuities, outliers, and cadence-related artifacts.
6) Record
   - Record all choices as provenance and logs suitable for papers/teaching.

## Templates
- Provenance record: `assets/provenance.md`
- Quality flags decision log: `assets/quality-flags-log.md`
- Stitching notes checklist: `references/stitching-checklist.md`

## Definition of Done
- A third party can reproduce the exact downloaded data and filtering decisions.
- Stitching method and parameters are recorded.
- Known contamination/systematics risks are documented.

## Related skills
- `photometry-systematics-debug` and `exoplanet-transit-workflow`.
- `astro-catalog-query-hygiene` for reproducible queries and caching.

