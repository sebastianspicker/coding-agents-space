---
name: sonic-pi-livecoding-workflow
description: "Sonic Pi live-coding performance playbook. Use when preparing or running a live set: audio routing, timing/sync (BPM/cues), reusable patterns, performance safety (panic/fallback), recording/export, and set notes."
---

# sonic-pi-livecoding-workflow (Playbook)

Use this to prepare and execute Sonic Pi performances in a way that is repeatable and resilient under stage conditions.

## When to use (triggers)
- You’re preparing a live set in Sonic Pi (solo or ensemble).
- Timing drifts across parts, or you need cue-based coordination.
- You need a safe performance plan (volume discipline, panic/stop behavior, fallbacks).
- You want recording/export with clear metadata.

## Inputs / Outputs
- Inputs: set duration, hardware setup, audio routing (interface/JACK/etc.), collaboration needs (cues/tempo), recording requirements.
- Outputs: setlist + cue sheet, performance checklist, recording log, and a brief set-notes doc.

## Step sequence (Setup -> Sync -> Build -> Rehearse -> Perform -> Record)
1) Setup (audio routing + safety)
   - Confirm output device and monitoring path (avoid feedback loops).
   - Set safe gain staging: start quiet; plan one master limiter path if needed (external).
2) Sync (timing + cues)
   - Define the “clock owner” for ensemble timing.
   - Use cues to coordinate structure changes and entries.
3) Build (patterns + control)
   - Prefer parameterized patterns you can mutate live (density, pitch set, dynamics).
   - Separate musical intent from performance controls (e.g., global intensity variable).
4) Rehearse (failure modes)
   - Practice: stop/start, recovering from a broken loop, and safe transitions.
5) Perform (operational discipline)
   - Make changes incrementally; keep a “safe base layer” running.
6) Record/export
   - Record with metadata (tempo, version, patch notes).

## Timing and sync guidelines
- Establish a single BPM definition and keep it stable unless a tempo change is deliberate and cued.
- Use cue points for:
  - section boundaries
  - drop/return moments
  - ensemble entrances and coordinated FX changes
- Avoid relying on “perfect” manual timing; build your structure around sync points.

## Performance safety checklist (principles)
- Have a “panic” response plan (stop all / fade out / cut to safe layer).
- Ensure your loudness strategy (avoid sudden +12 dB jumps).
- Keep CPU headroom; avoid piling on heavy FX late in the set.
- Keep a fallback pattern or drone that can carry a transition.

## Templates
- Setlist + cue sheet: `assets/setlist-cue-sheet.md`
- Performance checklist: `assets/performance-checklist.md`
- Recording log: `assets/recording-log.md`
- Troubleshooting notes: `references/troubleshooting.md`

## Definition of Done
- You can start the set cleanly and transition between sections using cues.
- You have a documented panic/fallback plan and tested it once.
- Recording/export workflow is verified (file produced, labeled, and stored).

