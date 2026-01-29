---
name: astro-literature-tracking
description: "Astronomy literature tracking playbook. Use when managing related work systematically: mission/method/target/result matrix, claim→citation discipline, and explicit separation of observed vs inferred statements for papers and teaching."
---

# astro-literature-tracking (Playbook)

Use this to build a defensible “related work” base for exoplanets, binaries, and astro education work.

## When to use (triggers)
- You’re writing a literature review or related-work section.
- You need to keep paper claims tied to citations and avoid misrepresenting results.
- You want a reusable matrix for missions/methods/targets/results.

## Inputs / Outputs
- Inputs: research question, scope boundaries, paper list, citation manager (optional).
- Outputs: related-work matrix + claim/citation log + notes on evidence vs inference.

## Step sequence (Scope -> Collect -> Extract -> Compare -> Cite -> Maintain)
1) Scope
   - Define inclusion/exclusion criteria and time window.
2) Collect
   - Collect candidate papers and store bibliographic data.
3) Extract
   - Extract key attributes into the matrix (mission/method/target/result).
4) Compare
   - Identify agreement/disagreement and possible reasons (data, method, priors).
5) Cite
   - For each claim in your writing, ensure a citation exists and matches the claim.
6) Maintain
   - Update matrix as new papers are added; track versions.

## Templates
- Related work matrix (CSV): `assets/related-work-matrix.csv`
- Claim/citation log: `assets/claim-citation-log.md`
- “Observed vs inferred” guide: `references/observed-vs-inferred.md`

## Definition of Done
- Matrix covers the key papers for the scope.
- Claims in your document map to citations via the log.
- You can justify differences between papers without overstating certainty.

## Related skills
- `academic-research` for general literature workflow and source quality.
- `reverse-spec` for “observed vs inferred” discipline (applied to papers instead of code).

