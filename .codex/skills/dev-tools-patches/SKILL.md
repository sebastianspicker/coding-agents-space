---
name: dev-tools-patches
description: "Playbook for dev-tools-patches. Use when `ts-optimize` / `ps1-optimize` returned patches and you want a safe “patch-first” workflow; you need to decide between manual application vs `applyFixes=true`; you want to avoid accidental writes outside `/workspace`."
---

# dev-tools-patches (Playbook)

Use this when a runtime skill returns `data.patches[]` (unified diffs) and you need to review/apply them safely.

## When to use (triggers)
- `ts-optimize` / `ps1-optimize` returned patches and you want a safe “patch-first” workflow.
- You need to decide between manual application vs `applyFixes=true`.
- You want to avoid accidental writes outside `/workspace`.

## Inputs / Outputs
- Inputs: JSON output from the runtime skill, plus the original input JSON used to generate it.
- Outputs: reviewed patch list, applied changes (or a decision not to apply), and verification results.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: re-run the same input with `applyFixes=false` to confirm the patch set is deterministic.
2) Diagnose: review each patch (intent, scope, safety) and decide apply vs reject.
3) Fix: apply the accepted patches (prefer `applyFixes=true`), keep diffs minimal.
4) Verify: run the target project's checks + re-run the skill to confirm no new findings.

## Recommended application workflow (preferred)
These runtime skills are designed to **emit patches and optionally apply them**.
For most cases, applying via the tool is safer than trying to apply the diff externally.

1) Run patch-only:
   - Keep `applyFixes=false` (default) and inspect `data.patches[]`.
2) If the patch intent is correct, re-run the same action(s) with `applyFixes=true`.
3) Immediately run verification commands in the target project.

## Notes on patch format (important)
- Patches are produced via the Node `diff` library (`createTwoFilesPatch`) and typically reference paths like `/workspace/...`.
- Because of that, applying them with `git apply` in your host repo may not work without path rewriting.
- If you must apply manually, treat the patch as a “diff preview” and re-implement the change directly, then verify.

## Verification (this repo)
- `cd skills/dev-tools/ts-optimize && npm install && npm run build && npm test`
- `cd skills/dev-tools/ps1-optimize && npm install && npm run build && npm test`

## Definition of Done
- Every applied patch is understood and intentional.
- No writes occur outside the intended project scope.
- Verification passes after applying changes (or failures are documented).
