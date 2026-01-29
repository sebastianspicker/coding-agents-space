---
name: py-quality
description: "Playbook for py-quality. Use when improving Python code quality with formatting/linting/typing, reducing flakiness, and keeping diffs minimal and verified."
---

# py-quality (Playbook)

Use this to improve quality without changing behavior (unless explicitly required).

## When to use (triggers)
- Lint/type checks fail (ruff/flake8/mypy/pyright).
- You want consistent formatting and fewer runtime footguns.
- You need to standardize project structure and imports.

## Inputs / Outputs
- Inputs: target package/module, configured tools (pyproject/setup.cfg), CI checks.
- Outputs: minimal patch + commands that verify quality gates.

## Step sequence
1) Detect toolchain
   - Look for `pyproject.toml`, `setup.cfg`, `tox.ini`, `.pre-commit-config.yaml`.
2) Apply the repo’s chosen formatters/linters
   - Don’t introduce a new tool unless asked.
3) Fix the highest-signal issues first
   - correctness, types, flaky tests, security
   - style last
4) Verify
   - run narrow checks, then broad checks

## High-value improvements
- Add type hints on public APIs (if repo uses typing).
- Replace ad-hoc path handling with `pathlib`.
- Make error messages actionable and consistent.
- Reduce implicit global state and side effects.

## Definition of Done
- Quality toolchain is respected (no new tooling unless requested).
- The smallest relevant gate set passes (format/lint/types/tests as configured).
- Diffs remain focused and reviewable.

## Related skills
- `repo-run-commands` to derive the right verification commands.
- `py-refactor` for structural changes with behavior preservation.

## References
- Quality gate template: `references/quality-gates.md`

## Credits
- Quality gate ordering influenced by common ruff/mypy/pytest workflows and the repo’s verification-first philosophy.
