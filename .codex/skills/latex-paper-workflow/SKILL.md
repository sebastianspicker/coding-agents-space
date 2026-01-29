---
name: latex-paper-workflow
description: "LaTeX paper workflow playbook. Use when writing academic papers in LaTeX with reproducible builds, BibTeX citations, figures/tables, and a verification-first drafting process."
---

# latex-paper-workflow (Playbook)

Use this to draft papers in LaTeX with a repeatable build and a clean citation workflow.

## When to use (triggers)
- You’re writing a paper/report in LaTeX (local or Overleaf).
- You need a stable build (latexmk) and consistent references (BibTeX).
- You’re integrating figures/tables generated from code.

## Inputs / Outputs
- Inputs: target venue format (if any), author list, bibliography sources, figure/table generation pipeline.
- Outputs: LaTeX project skeleton + build commands + citation discipline + submission-ready checklist.

## Step sequence (Scaffold -> Write -> Cite -> Figure -> Build -> Polish)
1) Scaffold
   - Start from a minimal project skeleton and add sections incrementally.
2) Write (structure-first)
   - Use a stable structure (IMRaD or venue template).
   - Track claims that require citations as TODOs until sourced.
3) Cite (BibTeX discipline)
   - One claim -> one citation (or justify why not).
   - Keep BibTeX entries clean and deduplicated.
4) Figures / tables (reproducible)
   - Prefer generating figures/tables from scripts with pinned inputs.
   - Store generated artifacts under version control when appropriate, or document how to regenerate.
5) Build
   - Build locally with latexmk (or CI) until warnings are understood.
   - Fail on missing references and broken citations.
6) Polish
   - Check consistency: terminology, abbreviations, units, references.
   - Prepare a submission checklist (format, anonymization, artifact links).

## Build rules (verification-first)
- Keep a single “how to build” command and make it deterministic.
- Treat these as issues to fix (not ignore):
  - undefined references
  - missing citations
  - missing figures
  - obvious overfull hboxes caused by broken formatting

## Templates
- Minimal project skeleton: `assets/main.tex`
- BibTeX starter: `assets/references.bib`
- `latexmk` Makefile: `assets/Makefile`
- Submission checklist: `references/submission-checklist.md`

## Definition of Done
- `make pdf` produces a PDF deterministically (local or CI).
- Citations compile cleanly, and references are complete.
- Figures/tables are reproducible (regeneration instructions exist).

## Related skills
- `academic-paper-writing` and `academic-research` for writing + citation workflows.
- `docs-coauthoring` for reader-focused iteration and clarity checks.

## Credits
- Written as a repo-first LaTeX workflow; aligns with common latexmk/BibTeX best practices.

