---
name: astro-catalog-query-hygiene
description: "Astronomical catalog query hygiene playbook. Use when running reproducible catalog queries (IDs, cones, crossmatches) with caching, rate-limit handling, query logs, and provenance suitable for papers and teaching materials."
---

# astro-catalog-query-hygiene (Playbook)

Use this to make catalog queries reproducible and reviewable: every query is logged, cached, and tied to an analysis result.

## When to use (triggers)
- Crossmatching sources between catalogs.
- Cone searches, ADQL queries, or API-based archive queries.
- Building datasets used for analysis or teaching labs.

## Inputs / Outputs
- Inputs: target list, catalogs/services, query parameters, rate limits, privacy constraints (if any).
- Outputs: query log + cache policy + reproducible query scripts/notebooks.

## Step sequence (Design -> Query -> Cache -> Validate -> Record)
1) Design
   - Choose identifiers and coordinate frames intentionally (ICRS, epoch).
2) Query
   - Execute queries with explicit parameters; avoid manual GUI-only steps.
3) Cache
   - Cache raw responses; record versions and timestamps.
4) Validate
   - Validate crossmatch logic (radius, duplicates, ambiguous matches).
5) Record
   - Keep a query log with rationale and outputs used downstream.

## Templates
- Query log: `assets/query-log.md`
- Cache policy: `assets/cache-policy.md`
- Crossmatch sanity checklist: `references/crossmatch-checklist.md`

## Definition of Done
- Query parameters are fully recorded and re-runnable.
- Cached outputs are used consistently across runs.
- Crossmatch ambiguities and selection rules are documented.

## Related skills
- `space-mission-lightcurves` for mission archive queries.
- `astro-literature-tracking` for connecting datasets to cited sources.

