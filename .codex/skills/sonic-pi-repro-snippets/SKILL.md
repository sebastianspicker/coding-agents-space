---
name: sonic-pi-repro-snippets
description: "Sonic Pi reproducible snippets playbook. Use when building a small, reusable pattern library: parameterized functions, deterministic randomness (seed), testable musical invariants, and a snippet index with expected outcomes."
---

# sonic-pi-repro-snippets (Playbook)

Use this to build a snippet library that is easy to reuse in teaching and performance, and stable enough to reason about.

## When to use (triggers)
- You want a curated pattern library for classes or ensembles.
- You want deterministic behavior for demos (same output each run).
- You need “musical invariants” (constraints) that can be tested or audited.

## Inputs / Outputs
- Inputs: target musical concepts (rhythm/harmony/texture), sonic palette (synths/samples), constraints (tempo/level), audience level.
- Outputs: snippet index + snippet templates + documented invariants and example usage.

## Step sequence (Design -> Parameterize -> Seed -> Document -> Validate)
1) Design
   - Define snippet purpose in one sentence (e.g., “euclidean-ish kick pattern with density knob”).
2) Parameterize
   - Expose a small set of parameters (density, scale, cutoff, swing) with safe ranges.
3) Seed (determinism)
   - Use explicit random seeds for demos and regression checks.
4) Document
   - Write an “expected outcome” description (not absolute audio).
5) Validate
   - Validate invariants: tempo stability, amplitude bounds, note-set constraints, CPU sanity.

## Suggested invariants (examples)
- Loudness: keep amplitudes within a safe range to avoid clipping.
- Pitch set: restrict to a defined scale/chord set unless explicitly exploring “out-of-scale”.
- Density: cap event rate to avoid CPU collapse.
- Timing: keep a stable beat grid unless the snippet is about drift/swing.

## Templates
- Snippet index: `assets/snippet-index.md`
- Snippet template: `assets/snippet-template.rb`
- Invariants guide: `references/invariants.md`

## Definition of Done
- Each snippet has: name, intent, params, safe ranges, and expected outcome description.
- At least one deterministic seed demo exists per snippet.
- Invariants are documented and checked during rehearsal/class prep.

