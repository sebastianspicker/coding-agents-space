---
name: web-audio-debug
description: "Web Audio debugging playbook. Use when diagnosing clicks/pops, drift, timing jitter, sample-rate mismatch, AudioWorklet issues, and graph bugs via a minimal repro harness and a symptom→graph hypothesis workflow."
---

# web-audio-debug (Playbook)

Use this to debug Web Audio problems in a reproducible way, separating audio-thread issues from UI/main-thread issues.

## When to use (triggers)
- Clicks/pops or zipper noise when changing parameters.
- Drift between scheduled events and playback.
- Jitter under load or when the tab is backgrounded.
- Sample rate mismatch or resampling artifacts.
- AudioWorklet integration bugs.

## Inputs / Outputs
- Inputs: browser/platform, minimal repro steps, graph description (nodes and connections), scheduling approach.
- Outputs: minimal repro harness + hypothesis log + verified fix.

## Step sequence (Repro -> Inspect -> Hypothesize -> Isolate -> Fix -> Verify)
1) Repro
   - Build/confirm a minimal repro harness and freeze variables.
2) Inspect
   - Record sample rate, buffer sizes (where observable), and node graph.
3) Hypothesize
   - Write a single primary cause hypothesis (e.g., discontinuity, scheduling jitter, GC pauses).
4) Isolate
   - Remove half the graph until the issue disappears, then re-add.
5) Fix
   - Apply smoothing/ramping, scheduling changes, or graph restructuring.
6) Verify
   - Re-run the repro and record that the symptom is gone.

## Common causes by symptom
- Clicks/pops:
  - parameter changes without ramps
  - sudden gain changes / discontinuities
- Drift/jitter:
  - scheduling on main thread without lookahead
  - heavy UI work blocking scheduling
- Sample-rate mismatch:
  - offline render vs live context differences
  - device sample rate not matching assumptions

## Templates
- Minimal repro harness: `assets/repro.html`, `assets/repro.js`
- Symptom → graph hypothesis log: `assets/hypothesis-log.md`
- Debug checklist: `references/checklist.md`

## Definition of Done
- Repro harness exists and demonstrates the issue reliably.
- Fix is minimal and confirmed in the repro and the real app.
- A regression note exists (what to avoid next time).

