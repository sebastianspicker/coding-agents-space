# ts-dedupe (Playbook)

Use this when you need to find **duplicate code candidates** and turn them into safe follow-up changes.

## When to use (triggers)
- Suspected copy/paste blocks across files or folders.
- You want to reduce maintenance cost without changing behavior.
- You want a deterministic "candidate list" first, then a controlled refactor.

## Inputs / Outputs
- Inputs: repo path + scope, expected duplication patterns (helpers, constants, parsing, error handling).
- Outputs: dedupe candidates, recommended extraction points, optional patches (if supported), verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: run dedupe detection on a narrow scope.
2) Diagnose: rank candidates by impact and risk; confirm they are semantically equivalent.
3) Fix: extract shared helpers behind stable APIs; keep each change reviewable.
4) Verify: run tests/typecheck; re-run dedupe to confirm reduction.

## Optional: use the runtime skill in this repo
`skills/dev-tools/ts-optimize` supports a `dedupe` action that emits candidates as findings.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    {
      "type": "dedupe",
      "dedupe": { "strategy": "token-hash", "minTokens": 80, "maxCandidates": 800 },
      "targets": { "paths": ["src"] }
    }
  ]
}
```

## Notes / limitations
- Dedupe findings are "candidates": always validate semantics before extracting.
- Prefer follow-up PRs: (1) candidate discovery, (2) extraction refactor, (3) cleanup.

## Definition of Done
- Candidate list is reviewed and triaged.
- Any extraction preserves behavior and is covered by tests (or has a documented verification plan).
- Dedupe signal decreases or the remaining duplicates are explicitly accepted.
