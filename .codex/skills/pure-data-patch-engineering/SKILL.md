---
name: pure-data-patch-engineering
description: "Pure Data patch engineering playbook. Use when designing, refactoring, or debugging Pd patches: signal-flow conventions, abstraction hygiene, message vs signal, scheduling pitfalls, DSP graph debugging, CPU profiling, and click/pop mitigation."
---

# pure-data-patch-engineering (Playbook)

Use this to keep Pd patches maintainable, performant, and debuggable—especially in teaching contexts where clarity matters.

## When to use (triggers)
- A Pd patch is hard to understand or modify (spaghetti wiring).
- Audio clicks/pops, CPU spikes, or unstable scheduling.
- You need reusable abstractions for a course or ensemble project.
- You want a minimal reproduction patch for a bug.

## Inputs / Outputs
- Inputs: Pd version, externals used, audio I/O context, patch intent, known symptoms.
- Outputs: refactor plan + patch review checklist results + minimal repro patch (if debugging) + documented conventions.

## Step sequence (Conventions -> Structure -> Debug -> Optimize -> Verify)
1) Conventions
   - Decide signal-flow direction and naming conventions (document them).
2) Structure
   - Extract reusable abstractions; reduce global state where possible.
3) Debug
   - Localize: message timing vs DSP, control-rate vs audio-rate, and graph order pitfalls.
4) Optimize
   - Profile CPU hotspots and remove unnecessary DSP work.
5) Verify
   - Verify audio stability (no clicks/pops under normal usage) and patch readability.

## Message vs signal (core discipline)
- Message domain: discrete events, scheduling, UI interactions.
- Signal domain: continuous audio-rate processing.
- Common failure: mixing timing assumptions between domains (e.g., UI bangs triggering audio changes without ramps).

## Click/pop mitigation patterns (conceptual)
- Use ramps for parameter changes (avoid instantaneous discontinuities).
- Avoid abrupt toggling of DSP paths under load without smoothing.
- Keep gain staging conservative; avoid clipping cascades.

## Templates
- Patch review checklist: `assets/patch-review-checklist.md`
- Abstraction template: `assets/abstraction-template.md`
- Bug repro patch template: `assets/bug-repro-patch.md`
- Debugging checklist: `references/debugging.md`

## Definition of Done
- Patch conventions are documented and followed.
- Abstractions have clear inlets/outlets and names.
- Known clicks/pops or CPU spikes are reproducibly diagnosed and mitigated (or limitations documented).

