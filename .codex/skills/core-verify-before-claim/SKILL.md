---
name: core-verify-before-claim
description: "Core evidence gate. Use before claiming work is done: identify, run, and report verification commands with evidence."
---

# core-verify-before-claim (Playbook)

Use this before saying “done”, “fixed”, or “tests pass”.

## When to use (triggers)
- Before finishing a task, opening a PR, or announcing success.
- After applying a patch or changing behavior.

## Gate workflow
1) Identify
   - What command(s) prove the claim?
2) Run
   - Run them now (fresh).
3) Read
   - Confirm exit codes and check for hidden failures/flakes.
4) Report
   - Report what you ran, where you ran it, and the result.

## Common claims → evidence
- “Tests pass” → run the repo’s test command(s) for the affected scope (see `.codex/skills/repo-run-commands/SKILL.md`).
- “Build works” → run build/typecheck for the affected package/workspace.
- “Bug fixed” → re-run the original repro (and ideally a regression test).
- “No security issues” → at least run configured audits/scanners; otherwise say “not assessed”.

## Output template
- Evidence:
  - Commands:
  - Exit codes:
  - Key output:

## Template
- Verification log: `assets/verification-log.md`

## Definition of Done
- The commands that prove the claim are documented and freshly run.
- Results (exit codes + key output) are recorded.

## Credits
- Inspired by [obra/superpowers](https://github.com/obra/superpowers) (adapted and condensed for this repo’s workflows).
