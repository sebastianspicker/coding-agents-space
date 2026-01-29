---
name: reverse-spec
description: "Playbook for reverse-spec. Use when reverse-engineering undocumented systems to extract an evidence-based specification (facts vs inferences) and a verification plan."
---

# reverse-spec (Playbook)

Use this when you need to understand and document a system from code: APIs, behaviors, invariants, and edge cases.

## When to use (triggers)
- Legacy/undocumented codebase.
- You need a specification before making risky changes.
- You want to produce a clear “observed behavior” document for others.

## Inputs / Outputs
- Inputs: scope (feature/system), entry points, constraints (read-only vs can run).
- Outputs: a spec document + open questions + recommended tests.

## Step sequence (Explore -> Trace -> Specify -> Validate)
1) Explore
   - Map directories and main entry points.
   - Identify runtime boundaries (web handlers, jobs, CLIs).
2) Trace
   - Follow the data flow for the target feature.
   - Capture:
     - inputs (types/shape)
     - outputs (shape, errors)
     - side effects (DB writes, external calls)
3) Specify
   - Write “observed requirements” as facts.
   - Keep inferences in a separate section.
4) Validate
   - Propose a verification plan:
     - characterization tests
     - golden files
     - contract tests for APIs

## Output template
- Save specs under `specs/` using the template: `assets/spec-template.md`

## Definition of Done
- Spec is evidence-based (facts vs inferences separated).
- Open questions are explicit and prioritized.
- Verification plan exists (tests/manual checks) for critical behavior.

## Related skills
- `core-debug-root-cause` when you need a repro-first investigation.
- `security-audit` to note security-relevant behavior.

## References
- Evidence checklist: `references/evidence-checklist.md`

## Credits
- Inspired by [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (facts vs inferences discipline; rewritten as a simpler, repo-first spec extraction playbook).
