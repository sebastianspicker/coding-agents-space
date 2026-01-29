---
name: sh-implement
description: "Playbook for sh-implement. Use when writing or changing shell scripts (bash/sh/zsh) with safe defaults, good CLI ergonomics, and reproducible verification."
---

# sh-implement (Playbook)

Use this to implement shell scripts that are **predictable**, **portable enough**, and **safe by default**.

## When to use (triggers)
- You need a new bash/sh/zsh script for automation, CI, or tooling.
- You’re adding flags/options to an existing script.
- You need to make a script cross-platform (macOS/Linux) or CI-friendly.

## Inputs / Outputs
- Inputs: purpose, expected inputs/outputs, target shells (bash vs sh), platforms, constraints (no network, no sudo, etc.).
- Outputs: script diff, usage/help text, and a verify command set.

## Defaults (choose explicitly)
- Prefer **bash** for non-trivial scripts (arrays, `pipefail`, better ergonomics).
- Use **POSIX sh** only when portability is a hard requirement.

## Step sequence (Design -> Implement -> Verify)
1) Design
   - Define interface: args/flags, stdin/stdout behavior, exit codes.
   - Decide where output goes:
     - machine-readable → stdout
     - logs/errors → stderr
2) Implement
   - Add strict mode where supported:
     - bash: `set -euo pipefail`
     - sh: `set -eu` (no `pipefail` universally)
   - Validate inputs early with clear errors.
   - Avoid parsing with `grep | awk | sed` chains when structured data tools exist.
3) Verify
   - Add a dry-run mode if destructive actions exist.
   - Run `shellcheck` and format (if tools exist).
   - Run minimal unit-like checks by invoking the script with representative inputs.

## Recommended script skeleton (bash)
Use `assets/bash-skeleton.sh` as a starting point.

## Common requirements
- Deterministic output (stable ordering).
- Clear exit codes:
  - `0` success
  - `2` usage error
  - `>=3` runtime failures
- No writes outside intended directories.

## Common “missing functions” to consider (add only if needed)
- `trap` cleanup for temp files and partial state.
- `--dry-run` for destructive operations.
- `--json` output mode for automation pipelines (stdout only).
- `--verbose` / `--quiet` for controllable logging.

## Definition of Done
- Script has a clear interface (`--help`), safe defaults, and actionable errors.
- Script runs in the intended environments (local + CI if applicable).
- Any destructive behavior has a dry-run or explicit confirmation mechanism.

## Related skills
- `sh-debug` when the script behaves differently across environments.
- `sh-quality` to harden existing scripts without behavior changes.

## References
- Bash skeleton: `assets/bash-skeleton.sh`
- POSIX sh skeleton: `assets/sh-skeleton.sh`

## Credits
- Influenced by CLI ergonomics patterns from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (help/error conventions; rewritten for shell scripts).
