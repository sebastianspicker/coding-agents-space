---
name: music-tech-lab-design
description: "Music technology lab design playbook. Use when designing Sonic Pi/Pd/Tone.js labs: learning goals, scaffolding, rubrics, common failure modes, accessibility, and hearing-safety guidelines with reusable templates."
---

# music-tech-lab-design (Playbook)

Use this to design labs/assignments that are pedagogically aligned and operationally robust across heterogeneous student setups.

## When to use (triggers)
- Creating a new lab for Sonic Pi, Pure Data, or Tone.js/Web Audio.
- Students struggle due to setup friction or unclear success criteria.
- You need grading rubrics and consistent feedback structures.

## Inputs / Outputs
- Inputs: audience level, devices/OS constraints, time budget, assessment style, accessibility requirements.
- Outputs: lesson plan + rubric + misconception/failure-mode checklist + safety note.

## Step sequence (Goals -> Tooling -> Scaffold -> Assess -> Pilot -> Iterate)
1) Goals
   - Define 1–3 measurable learning outcomes.
2) Tooling
   - Choose tool that supports the outcomes with minimal setup friction.
3) Scaffold
   - Provide incremental tasks with clear intermediate checkpoints.
4) Assess
   - Define rubric and acceptance criteria that match the outcomes.
5) Pilot
   - Pilot on at least one “weak” device setup; record failure modes.
6) Iterate
   - Update instructions and guardrails based on observed issues.

## Hearing safety and accessibility (baseline)
- Default volume low; require students to start quiet.
- Warn about feedback loops; document safe monitoring.
- Provide visual alternatives (plots, meters) when possible.

## Templates
- Lesson plan: `assets/lesson-plan.md`
- Rubric: `assets/rubric.md`
- Misconception checklist: `assets/misconception-checklist.md`
- Hearing safety notes: `references/hearing-safety.md`

## Definition of Done
- Learning goals, tasks, and rubric are aligned.
- Setup steps are tested and documented.
- Safety and accessibility notes are included.

