---
name: sh-debug
description: "Playbook for sh-debug. Use when debugging bash/sh/zsh scripts, CI shell steps, or command pipelines with reproducible evidence and minimal, safe fixes."
---

# sh-debug (Playbook)

Use this for **Shell debugging** (bash/sh/zsh), especially in CI, Docker builds, or scripts that behave differently across machines.

## When to use (triggers)
- A shell script fails intermittently or only in CI.
- A pipeline/command succeeds locally but fails in Docker/remote.
- You see quoting/word-splitting/globbing issues, wrong exit codes, or silent failures.

## Inputs / Outputs
- Inputs: failing command/script, exact logs, environment (OS, shell, CI), expected behavior.
- Outputs: root cause summary, minimal patch, and verification commands.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Capture the **exact command line** and working directory.
   - Identify the shell: `bash --version`, `zsh --version`, `sh --version` (if applicable).
   - Re-run with strict mode in a safe sandbox if possible.
2) Diagnose
   - Confirm the script interpreter (shebang) and execution mode.
   - Identify common failure classes:
     - word splitting / globbing
     - `set -e` / `pipefail` surprises
     - subshell scope, `cd` assumptions, relative paths
     - missing tools in PATH, different `sed/grep` variants (GNU vs BSD)
3) Fix
   - Make the smallest change that fixes the root cause.
   - Prefer explicit quoting, explicit shells, explicit working directories.
4) Verify
   - Re-run the minimal repro locally.
   - Mirror CI by running the same scripts/targets as CI (or the repo’s documented verify set).

## Debugging checklist
- **Print the environment you rely on**
  - `pwd`, `ls -la`, `echo \"$SHELL\"`, `echo \"$PATH\"`
  - `env | rg -n '^(CI|GITHUB|RUNNER|HOME|SHELL)='` (or `grep`)
- **Enable trace output safely**
  - `set -x` (and `set +x` around secret handling)
  - For bash: `PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '`
- **Validate syntax**
  - `bash -n script.sh`
  - `shellcheck script.sh` (if available)
- **Catch pipeline failures**
  - In bash: `set -o pipefail`
  - Avoid `cmd | grep ...` patterns that mask failures.
- **Eliminate ambiguous globbing**
  - Quote variables: `\"$var\"`
  - Prefer arrays in bash for argument lists.

## Output format (recommended)
- Root cause: 1–3 sentences, include the exact failing condition.
- Patch: minimal diff only.
- Evidence: command(s) run + observed output/exit code.

## Definition of Done
- Root cause is identified (not guessed) and documented.
- Fix is minimal and reviewable.
- Repro command(s) succeed and relevant checks are re-run.

## Related skills
- `core-debug-root-cause` for a stricter root-cause workflow.
- `core-verify-before-claim` before claiming the issue is fixed.

## References
- Common root causes and fixes: `references/common-failures.md`
- Minimal repro template: `assets/repro-template.md`

## Credits
- Root-cause-first structure influenced by [obra/superpowers](https://github.com/obra/superpowers) (adapted to shell-specific failure modes).
