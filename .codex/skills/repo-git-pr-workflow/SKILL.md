# repo-git-pr-workflow (Playbook)

Use this when you need a predictable **branch/commit/PR workflow** for code changes.

## When to use (triggers)
- You are preparing a PR and want reviewable, low-risk diffs.
- You need to split a large change into safe steps.
- You want consistent commit messages and verification evidence.

## Inputs / Outputs
- Inputs: change goal, repo conventions, release/compat constraints, verification commands.
- Outputs: clean commit series (or single commit), PR description notes, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Start from a clean baseline (or document the existing dirty state).
2) Diagnose
   - Decide the smallest reviewable slices:
     - (1) mechanical changes (format/docs)
     - (2) behavior changes
     - (3) follow-up cleanup
3) Fix
   - Keep commits focused:
     - One behavior change per commit when possible.
     - Avoid mixing generated files unless necessary.
4) Verify
   - Run verification before pushing.
   - Include the exact commands in the PR description or commit notes.

## Definition of Done
- PR can be reviewed commit-by-commit.
- Verification is documented and passes.
- No accidental unrelated changes are included.
