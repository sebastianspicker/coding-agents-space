---
name: academic-research
description: "Playbook for academic-research. Use when conducting academic/technical research (literature review, source quality assessment, claim tracking) with reproducible notes and citations."
---

# academic-research (Playbook)

Use this to run research in an “academic-grade” way: explicit questions, traceable sources, and a claim→citation log.

## When to use (triggers)
- Literature review / related work for a paper.
- You need sources for technical claims (security, performance, ML, systems).
- You need a reproducible research log and bibliography workflow.

## Inputs / Outputs
- Inputs: research question(s), domain, constraints (time, paywalls), required citation style.
- Outputs: research log, annotated bibliography, and a synthesized outline for writing.

## Step sequence (Question -> Search -> Extract -> Synthesize -> Verify)
1) Question
   - Define the research question and acceptance criteria.
2) Search
   - Plan search terms and databases (ACM/IEEE/arXiv/etc.) appropriate to domain.
   - Record every search query in the research log.
3) Extract
   - For each source: capture bibliographic data + key claims + limitations.
4) Synthesize
   - Cluster sources by themes (methods, datasets, findings, critique).
   - Build a “related work matrix”.
5) Verify
   - Any factual claim in the output must map to at least one source entry.

## Anti-hallucination rules (strict)
- Don’t invent citations, author names, venues, or results.
- If a claim is not supported by a source you can cite, mark it as “needs source”.

## Templates
- Research log: `assets/research-log.md`
- Related work matrix: `assets/related-work-matrix.csv`
- Claim tracking sheet: `references/claim-tracking.md`
- BibTeX starter file: `assets/references.bib`
- Source quality rubric: `references/source-quality.md`

## Definition of Done
- Research log is complete (queries + sources + notes).
- Claims in the synthesis are traceable to sources.
- Open questions and gaps are explicit.

## Related skills
- `academic-paper-writing` for turning research into a paper draft.
- `reverse-spec` when sources include reverse-engineered system behavior.

## Credits
- Inspired by [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) (citation discipline) and [sanjay3290/ai-skills](https://github.com/sanjay3290/ai-skills) (research planning), adapted to avoid provider dependencies and enforce “no invented citations”.
