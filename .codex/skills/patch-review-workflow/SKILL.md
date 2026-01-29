---
name: patch-review-workflow
description: "Patch review workflow playbook. Use when reviewing generated or suggested patches (AI/tooling/codegen): risk triage, minimal diffs, verification planning, and safe application with clear evidence and rollback."
---

# patch-review-workflow (Playbook)

Use this when you receive patches from tools/agents or codegen and need a disciplined, reviewable workflow.

## When to use (triggers)
- Applying AI-generated patches.
- Reviewing automated refactors/lint fixes/codegen updates.
- Large diffs that must be split into safe steps.

## Inputs / Outputs
- Inputs: patch/diff, target area, expected behavior, verification commands, risk constraints.
- Outputs: review notes + accepted patch set + verification evidence + follow-up items.

## Step sequence (Triage -> Review -> Apply -> Verify -> Record)
1) Triage
   - Classify patch type: formatting, refactor, behavior change, security change, deps change.
2) Review
   - Ensure intent is clear and diff is minimal.
   - Check for hidden behavior changes and error-handling regressions.
3) Apply
   - Apply in small batches; keep commits logically separated (optional).
4) Verify
   - Run the right tests/build/lint; capture outputs.
5) Record
   - Record what changed and why; keep rollback options clear.

## Review checklist (starter)
- Patch only touches intended files.
- No accidental API/contract changes.
- Logging doesn’t leak secrets.
- Tests added for behavior changes.
- Performance-sensitive areas not regressed without measurement.

## Templates
- Review log: `assets/review-log.md`
- Verification log: `assets/verification-log.md`

## Definition of Done
- Patch is applied with evidence-based verification.
- Risky changes have rollback path.
- Follow-ups tracked (docs/tests/monitoring).

## Related skills
- `dev-tools-patches` for runtime skill patch application discipline.
- `core-verify-before-claim` for evidence gates.

