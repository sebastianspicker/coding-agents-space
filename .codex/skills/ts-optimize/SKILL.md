---
name: ts-optimize
description: "Playbook for ts-optimize. Use when you want TypeScript/JavaScript diagnostics beyond “just run tsc”; you need dedupe candidates, conservative lint fixes, import migrations, barrel codegen, or optimization recommendations; you want patch-first output (review diffs before applying)."
---

# ts-optimize (Playbook)

This playbook is the **agent-friendly cookbook** for the runtime skill at `skills/dev-tools/ts-optimize/`.
It maps the runtime actions (`debug|dedupe|lint|migrate|refactor|codegen|recommend`) into repeatable workflows.

## When to use (triggers)
- You want TypeScript/JavaScript diagnostics beyond “just run tsc”.
- You need dedupe candidates, conservative lint fixes, import migrations, barrel codegen, or optimization recommendations.
- You want patch-first output (review diffs before applying).

## Inputs / Outputs
- Inputs: JSON (see `skills/dev-tools/ts-optimize/schemas/input.schema.json`).
  - `project.root` must be under `/workspace` when using Docker.
  - Optional: `project.tsconfigPath`, `includeGlobs`, `excludeGlobs`.
  - `actions[]` (max 20), each with optional `targets.paths` scoping.
- Outputs: JSON `RunResult` with:
  - `data.findings[]` (kinds: `tsc|lint|dedupe|refactor|migration|codegen|recommendation`)
  - `data.patches[]` (unified diffs)
  - `data.metrics` (diagnostics, duplicationCandidates, estimatedComplexityHotspots, etc.)

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Start with a single action (e.g. `debug` or `lint`) and a narrow scope (`targets.paths`).
   - Prefer Docker sandbox execution (see `skills/dev-tools/ts-optimize/README.md`).
2) Diagnose
   - Read `data.logs` first (limits, skipped files, unsupported options).
   - Triage findings by kind and severity (fix errors first).
3) Fix
   - Default to patch-only runs.
   - Apply changes only when you agree with the intent (prefer `applyFixes=true` on a re-run).
4) Verify
   - Run the target project’s build/tests.
   - Re-run the same input to confirm the finding set is reduced and stable.

## Action cookbook

### debug (TypeScript diagnostics + heuristics)
Use when you need compiler errors plus “where are the hotspots?” signals.

- Levels:
  - `quick`: TypeScript pre-emit diagnostics only.
  - `medium`: diagnostics + “any hotspots” + complexity hotspots (threshold ~16).
  - `complex`: medium + perf heuristics + stricter complexity hotspots (threshold ~12).

Minimal input:
```json
{
  "project": { "root": "/workspace", "tsconfigPath": "/workspace/tsconfig.json" },
  "actions": [{ "type": "debug", "debugLevel": "medium", "targets": { "paths": ["src"] } }]
}
```

### dedupe (duplicate-code candidates)
Use when you suspect copy/paste or repeated helper blocks.

- Options:
  - `strategy`: `token-hash` (default) or `ast-shape` (more structural, typically slower).
  - `minTokens`: raise to reduce noise; lower to catch smaller repeats.
  - `maxCandidates`: cap output size.

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

### lint (conservative lint findings + optional safe fixes)
Use for small, deterministic improvements.

- Rules:
  - `prefer-const`: can emit patches and can auto-apply (safe rewrite).
  - `no-var`: emits findings only (no auto-fix).

Example (patch-only):
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "lint", "lintRules": ["prefer-const", "no-var"], "targets": { "paths": ["src"] } }]
}
```

Example (apply after review):
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "lint", "applyFixes": true, "lintRules": ["prefer-const"], "targets": { "paths": ["src"] } }]
}
```

### refactor (goal-driven, but currently limited auto-changes)
Use when you want refactor guidance with minimal automation risk.

- Important: only `prefer-const` produces automatic rewrites in v0.2; other goals are emitted as recommendation-only.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    {
      "type": "refactor",
      "applyFixes": true,
      "refactorGoals": ["prefer-const", "reduce-any", "simplify-control-flow"],
      "targets": { "paths": ["src"] }
    }
  ]
}
```

### migrate (import rename rules)
Use for library/API migrations where you want to preserve local names.

- `renameImports` rewrites named imports.
- If the imported name changes, the tool uses an `as` alias to keep the local name stable.
- Module renames are supported (rewrites the module specifier string).

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    {
      "type": "migrate",
      "applyFixes": true,
      "migrate": {
        "renameImports": [
          { "from": { "module": "old-lib", "name": "foo" }, "to": { "module": "new-lib", "name": "fooNew" } }
        ]
      },
      "targets": { "paths": ["src"] }
    }
  ]
}
```

### codegen (barrel exports)
Use to generate deterministic `index.ts` barrels in folders.

- `codegen.kind`: `barrel`
- `codegen.targetDirs`: directories relative to `project.root`
- Excludes `index.ts(x)` and `*.d.ts` from exports; sorts exports for stability.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "codegen", "applyFixes": true, "codegen": { "kind": "barrel", "targetDirs": ["src/utils"] } }]
}
```

### recommend (project-level optimization recommendations)
Use for actionable guidance (types, perf, bundle, numerics, testing, etc.).

Example:
```json
{
  "project": { "root": "/workspace", "tsconfigPath": "/workspace/tsconfig.json" },
  "actions": [{ "type": "recommend", "recommendFocus": ["perf", "types", "bundle", "testing"] }]
}
```

## Scoping and safety controls (important)
- Prefer narrowing scope:
  - `targets.paths`: accepts paths relative to `project.root` (recommended) or absolute paths.
  - `project.includeGlobs` / `project.excludeGlobs`: reduce the file set early.
- `targets.changedOnly` exists but is ignored; use explicit `targets.paths`.
- The tool hard-rejects paths outside `/workspace` in Docker runs.

## Patch workflow (recommended)
- Run patch-only first (default).
- Re-run with `applyFixes=true` only for the action(s) you accept.
- See `.codex/skills/dev-tools-patches/SKILL.md` for the apply/review workflow.

## Verification (this repo)
```bash
cd skills/dev-tools/ts-optimize
npm install
npm run build
npm test
```

## Definition of Done
- Input JSON is checked in or saved alongside the work (reproducible).
- Scope is minimal (`targets.paths` / globs) and intentional.
- Patches are reviewed before application.
- Verification passes, and a re-run shows reduced/stable findings.

## Runtime skill reference
- `skills/dev-tools/ts-optimize/README.md`
- `skills/dev-tools/ts-optimize/schemas/input.schema.json`

## Suggested future enhancements (not implemented yet)
- Implement `targets.changedOnly` (e.g., accept an explicit changed-file list or integrate with git when available).
- Add more deterministic, low-risk lint rules (unused imports, import ordering, no-shadow) guarded by strict safety checks.
- Implement additional `refactorGoals` as real rewrites (currently recommendation-only): `reduce-any`, `tighten-types`, `remove-dead-code`, etc.
- Improve patch portability (emit `a/` + `b/` headers or relative paths) to make external patch application easier.
