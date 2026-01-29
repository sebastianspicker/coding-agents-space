---
name: student-submission-eval
description: "Student submission evaluation playbook (music tech). Use when grading Sonic Pi/Pd/Tone.js submissions: light automation (lint/tests), deterministic render/export checks, copy-pattern awareness without accusations, and structured feedback aligned with rubrics."
---

# student-submission-eval (Playbook)

Use this to grade student work fairly and consistently, while keeping evaluation reproducible and feedback actionable.

## When to use (triggers)
- Grading code/patch submissions for music tech courses.
- Introducing minimal automation to reduce manual grading load.
- Handling potential copy/paste patterns with care and process.

## Inputs / Outputs
- Inputs: assignment spec, rubric, submission format(s), allowed tooling, privacy rules, expected artifacts (audio export, screenshots).
- Outputs: evaluation protocol + acceptance criteria checklist + feedback notes per submission.

## Step sequence (Intake -> Check -> Run -> Review -> Feedback -> Record)
1) Intake
   - Confirm submission format and required files; anonymize identifiers if needed.
2) Check (static)
   - Run light checks (lint/format/tests) where applicable; record results.
3) Run (deterministic)
   - Verify required artifacts: rendered audio, screenshots, patch runs.
4) Review (rubric-aligned)
   - Evaluate musical intent and technical correctness using the rubric.
5) Feedback
   - Provide specific, actionable feedback with next steps.
6) Record
   - Record grade rationale and any follow-up needed.

## Copy-pattern awareness (process, not accusations)
- Treat similarity as a signal to review, not proof.
- Look for learning evidence: comments, parameter choices, design decisions, reflection quality.
- If escalation is needed: follow institutional policy and document neutrally.

## Templates
- Evaluation protocol: `assets/evaluation-protocol.md`
- Feedback template: `assets/feedback-template.md`
- Acceptance criteria checklist: `assets/acceptance-criteria-checklist.md`
- Privacy notes: `references/privacy.md`

## Definition of Done
- Evaluation is reproducible and rubric-aligned.
- Feedback is actionable and respectful.
- Any integrity concerns are handled via documented process.

