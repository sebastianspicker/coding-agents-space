---
name: teaching-simulation-design
description: "Teaching simulation design playbook for astronomy/physics. Use when designing educational simulations: set learning goals, simplify models responsibly, add interactivity, anticipate misconceptions, and produce lesson plans and checks."
---

# teaching-simulation-design (Playbook)

Use this to design simulations for teaching that are pedagogically aligned and technically reproducible.

## When to use (triggers)
- Building classroom/lab simulations (transits, HZ, binaries, detection bias).
- Creating interactive demonstrations for concepts with common misconceptions.

## Inputs / Outputs
- Inputs: audience level, learning objectives, time constraints, available devices (web/phone), assessment style.
- Outputs: lesson plan + simulation spec + misconception checklist + assessment prompts.

## Step sequence (Goal -> Simplify -> Build -> Test -> Teach -> Iterate)
1) Goal
   - Define 1–3 measurable learning outcomes.
2) Simplify (responsibly)
   - Decide which physics to include/exclude; document limitations explicitly.
3) Build
   - Implement simulation with clear controls; avoid hidden state.
4) Test
   - Test with representative students/colleagues; capture confusion points.
5) Teach
   - Run with a plan: prompts, predictions, and reflection questions.
6) Iterate
   - Revise based on feedback and measured outcomes.

## Templates
- Lesson plan: `assets/lesson-plan.md`
- Misconception checklist: `assets/misconception-checklist.md`
- Simulation spec: `references/simulation-spec.md`

## Definition of Done
- Learning outcomes and limitations are explicit.
- Simulation behavior is reproducible and matches intended conceptual model.
- Assessment prompts exist and are aligned with goals.

## Related skills
- `astro-simulation-repro` for technical reproducibility.
- `classroom-data-analysis-python` for analyzing student/lab data.

