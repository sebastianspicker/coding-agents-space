---
name: tonejs-app-workflow
description: "Tone.js app workflow playbook. Use when building web audio apps: AudioContext lifecycle (user gesture), scheduling/Transport, polyphony and voice management, memory/perf hygiene, offline rendering/export, and browser/mobile constraints."
---

# tonejs-app-workflow (Playbook)

Use this to build Tone.js apps that are stable across browsers and predictable under load.

## When to use (triggers)
- Building a web instrument/sequencer/synth with Tone.js.
- You need reliable scheduling and a clear audio UX.
- You need export (recording/offline render) and performance constraints (mobile Safari).

## Inputs / Outputs
- Inputs: product goals (instrument/sequencer), interaction model, target platforms, polyphony needs, export requirements.
- Outputs: audio feature spec + implementation plan + perf/compat verification notes.

## Step sequence (Spec -> Unlock -> Schedule -> Manage -> Export -> Verify)
1) Spec
   - Define user interactions, expected latency, and output format (live vs export).
2) Unlock (AudioContext lifecycle)
   - Ensure audio starts only after a user gesture and handles resume/suspend reliably.
3) Schedule (Transport)
   - Use `Transport` for musical time scheduling; record tempo rules and swing policies.
4) Manage (voices/resources)
   - Bound polyphony; dispose nodes; avoid leaking connections.
5) Export
   - Choose strategy: offline render or real-time record; document limitations.
6) Verify
   - Verify on target browsers, including mobile constraints and backgrounding behavior.

## Performance hygiene
- Avoid creating nodes per tick; reuse where possible.
- Dispose nodes and disconnect graphs when no longer needed.
- Keep analyzers and visualizations bounded (sampling intervals, FFT sizes).

## Templates
- Audio feature spec: `assets/audio-feature-spec.md`
- Performance checklist: `assets/perf-checklist.md`
- Browser compatibility matrix: `assets/browser-compat-matrix.md`
- Patterns and pitfalls: `references/patterns.md`

## Definition of Done
- Audio starts/resumes reliably and is user-gesture compliant.
- Scheduling is stable at target tempo/density.
- Export path works (or is explicitly out of scope with rationale).

