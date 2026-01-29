---
name: academic-paper-writing
description: "Playbook for academic-paper-writing. Use when drafting or revising academic papers with a clear structure (IMRaD), citation discipline, and reproducible figures/tables and methods."
---

# academic-paper-writing (Playbook)

Use this to draft an academic paper (or a technical report) with strong structure and citation hygiene.

## When to use (triggers)
- You need to write a paper/report from research notes.
- You’re converting engineering work into an academic-style artifact.
- You need to improve clarity, structure, or scientific rigor.

## Inputs / Outputs
- Inputs: target venue/style, audience, main contributions, dataset/experiments (if any), citation style and bibliography format.
- Outputs: paper outline + drafted sections + checklist for completeness.

## Step sequence (Outline -> Draft -> Revise -> Verify)
1) Outline
   - Use an explicit structure (IMRaD or a venue-specific variant).
   - Define 1–3 contributions and the evidence for each.
2) Draft
   - Write section-by-section; keep claims backed by sources.
   - Separate “what we did” from “what we believe”.
3) Revise
   - Tighten the abstract/introduction last.
   - Improve figures/tables and ensure they match the text.
4) Verify
   - Run a “claim→citation” pass.
   - Ensure limitations and threats to validity are present.

## Templates
- Paper outline: `assets/paper-outline.md`
- Section checklist: `references/section-checklist.md`

## Practical additions (often missed)
- Keep a bibliography file (`.bib`) and a “claims needing sources” list.
- Record environment/repro steps for experiments (hardware, versions, seeds).

## Definition of Done
- Paper has a coherent structure and clearly stated contributions.
- Strong claims are supported by citations (or marked as needing sources).
- Limitations/threats to validity are present.

## Related skills
- `academic-research` for the literature and claim-tracking workflow.
- `it-runbook-documentation` when documenting reproducible environments/methods.

## Credits
- Inspired by [anthropics/skills](https://github.com/anthropics/skills) (structured drafting) and [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) (citation hygiene), adapted to academic papers and repo-local artifacts.
