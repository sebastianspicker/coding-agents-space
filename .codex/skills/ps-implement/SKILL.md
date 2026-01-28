# ps-implement (Playbook)

Use this when you need to **write PowerShell code** (scripts/modules) with a clean, reviewable path to verification.

## When to use (triggers)
- You are implementing a new PowerShell script/module feature.
- You need a bugfix that should land with a regression test (Pester if available).
- You want minimal diffs and predictable behavior across PS versions.

## Inputs / Outputs
- Inputs: requirements (expected vs actual), target PS version(s), module layout, scope boundaries, verification commands.
- Outputs: minimal patch set, tests (or documented verification), and short rationale.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro (baseline)
   - Reproduce the issue or define a tiny acceptance script.
   - Capture environment assumptions (PS version, OS, module paths).
2) Diagnose (design)
   - Identify the smallest seam to change and list invariants.
   - Decide what needs a test vs what can be covered by smoke runs.
3) Fix (implementation)
   - Implement in small patches:
     - Prefer advanced functions where appropriate.
     - Use explicit parameter validation and predictable error behavior.
     - Avoid hidden global state; keep outputs structured (objects) where possible.
4) Verify
   - Run Pester if present; otherwise smoke run the modified entry points.
   - Verify compatibility (if required) on the intended PS versions.

## Verification (generic)
- Look for repo test commands (Pester scripts, CI docs).
- If Pester exists, run focused tests first, then the suite.
- Always do a smoke run of the changed scripts/functions with representative inputs.

## Optional: runtime skill usage (this repo)
- Use `.codex/skills/ps1-optimize/SKILL.md` for deterministic lint/migrate/codegen/recommend recipes.

## Definition of Done
- Scope is explicit and small.
- Behavior is predictable and documented via tests or repeatable smoke steps.
- Verification is recorded and passes.
