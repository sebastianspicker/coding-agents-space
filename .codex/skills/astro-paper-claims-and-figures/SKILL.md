---
name: astro-paper-claims-and-figures
description: "Astronomy paper claims-and-figures playbook. Use when turning analysis into paper-ready claims and figures: claim→evidence→figure registry, reproducible figure generation, caption discipline, and explicit limitations/assumptions."
---

# astro-paper-claims-and-figures (Playbook)

Use this to convert analysis into publication-quality artifacts without losing provenance or overstating conclusions.

## When to use (triggers)
- Writing a paper/report/thesis section for an astro result.
- Creating figures from notebooks/scripts that must remain reproducible.
- You need a claim ledger to keep claims tied to evidence and citations.

## Inputs / Outputs
- Inputs: analysis outputs (tables/posteriors), target venue constraints, figure requirements, citation requirements.
- Outputs: claim ledger + figure registry + reproducible figure pipeline + caption checklist.

## Step sequence (Register -> Generate -> Verify -> Caption -> Audit)
1) Register
   - Write down claims and the evidence needed for each.
2) Generate
   - Generate figures/tables via scripts with pinned inputs.
3) Verify
   - Verify figures correspond to the stated dataset and parameters.
4) Caption
   - Write captions that state data selection and key caveats.
5) Audit
   - Ensure every claim has evidence and (where needed) citations.

## Templates
- Figure registry: `assets/figure-registry.md`
- Claim ledger: `assets/claim-ledger.md`
- Caption checklist: `references/caption-checklist.md`

## Definition of Done
- Figures are reproducible from pinned inputs and documented commands.
- Claims are traceable to evidence and citations.
- Limitations/assumptions are explicitly stated.

## Related skills
- `academic-paper-writing`, `latex-paper-workflow`, and `academic-research`.
- Domain workflows (transits/EBs) for fit reports and diagnostics.

