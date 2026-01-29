---
name: sh-quality
description: "Playbook for sh-quality. Use when improving shell script correctness, portability, readability, and safety (ShellCheck, formatting, safer patterns) without changing behavior."
---

# sh-quality (Playbook)

Use this when you want **safer**, **cleaner**, **more predictable** shell code while preserving behavior.

## When to use (triggers)
- CI fails due to shell linting or script brittleness.
- You want to reduce footguns (quoting, pipelines, error handling).
- You want consistent style and safer defaults.

## Inputs / Outputs
- Inputs: script(s), target shell(s), supported platforms, behavior constraints.
- Outputs: minimal patch, plus verification commands that prove behavior is unchanged.

## Step sequence (Baseline -> Improve -> Verify)
1) Baseline
   - Identify the script entry points and how they’re invoked.
   - Capture current behavior with a minimal repro (or existing CI job).
2) Improve
   - Apply the checklists below (in order).
   - Prefer **local fixes** over sweeping rewrites.
3) Verify
   - Run the script(s) on representative inputs.
   - Re-run any existing tests/CI targets that cover the scripts.

## Checklist: correctness & safety (high value)
- Quote expansions: prefer `"$var"` over `$var`.
- Avoid `for f in $(...)` and `ls | while read` patterns.
- Prefer `printf` over `echo` for portability.
- Avoid ambiguous `test` expressions; prefer `[[ ... ]]` in bash.
- Avoid relying on `set -e` semantics; handle errors explicitly for critical steps.
- Make pipelines fail as a unit (bash: `set -o pipefail`).

## Checklist: portability
- Avoid GNU-only flags unless pinned (e.g. `grep -P`, `sed -i` differences).
- Don’t assume `/bin/bash` exists; prefer `#!/usr/bin/env bash` if acceptable.

## Checklist: maintainability
- Keep functions small and named after intent.
- Centralize error handling (`die`, `usage`).
- Document assumptions (required tools, required env vars).

## Suggested verification
- `shellcheck path/to/script.sh` (if available)
- Smoke-run a representative command
- If used in CI: mirror the CI job locally

## Definition of Done
- Lint/format/safety improvements are applied without changing behavior.
- Script runs successfully for representative inputs.
- CI (or equivalent verification) passes for affected scripts.

## Related skills
- `sh-debug` for root-cause investigations.
- `repo-run-commands` to derive the correct verification commands.

## References
- Common fixes: `references/fixes.md`

## Credits
- Safety/portability checklist inspired by common ShellCheck guidance and debugging playbooks; consolidated for this repo’s style.
