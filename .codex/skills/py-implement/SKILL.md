---
name: py-implement
description: "Playbook for py-implement. Use when implementing Python features/bugfixes with small diffs, regression coverage, and repo-aligned verification."
---

# py-implement (Playbook)

Use this to implement Python changes in a way that is reviewable, testable, and compatible with the repo’s existing tooling.

## When to use (triggers)
- Adding a Python feature (script/library/service).
- Fixing a Python bug and needing a regression test.
- Touching behavior that affects CI or packaging.

## Inputs / Outputs
- Inputs: target module(s), expected behavior, constraints (no behavior change vs intended change), existing test patterns, CI gates.
- Outputs: minimal patch + regression test (when feasible) + verification commands.

## Step sequence (Plan -> Implement -> Verify)
1) Plan
   - Define success criteria and edge cases.
   - Decide test level (unit/integration/E2E) and where it lives.
2) Implement
   - Prefer small, mechanical changes.
   - Avoid adding new dependencies unless requested.
   - Keep logs/errors actionable and secrets-safe.
3) Verify
   - Run the narrowest checks first (targeted tests).
   - Then run the repo’s relevant gate set (tests + lint/types if configured).

## Common “missing functions” to consider (only if needed)
- CLI ergonomics: `--help`, exit codes, stderr vs stdout separation.
- Determinism: stable ordering, explicit seeds, no time-dependent defaults.
- Safe I/O: `pathlib`, atomic writes when updating files.
- Input validation at boundaries (parse args / validate configs / schema-check payloads).

## Templates
- Implementation plan: `assets/implement-plan.md`
- PR-ready verification log: `assets/verification-log.md`

## Definition of Done
- Behavior matches the agreed success criteria.
- Regression coverage exists when feasible (or limitation is documented).
- Relevant verification commands are run and results recorded.

## Related skills
- `py-debug` for root-cause-first investigations.
- `py-testing` for test design and flake reduction.
- `core-verify-before-claim` before claiming completion.

## Credits
- Influenced by Python implementation patterns from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (adapted into a repo-first, verification-first workflow).
