# ps1-optimize (Playbook)

This playbook is the **agent-friendly cookbook** for the runtime skill at `skills/dev-tools/ps1-optimize/`.
It maps the runtime actions (`debug|lint|migrate|refactor|codegen|recommend`) into repeatable workflows.

## When to use (triggers)
- You need PowerShell diagnostics (PSScriptAnalyzer when available) and reproducible findings.
- You want deterministic lint/refactor patches (whitespace), command migrations, module index codegen, or recommendations.
- You want patch-first output and controlled application (`applyFixes=true` only when intended).

## Inputs / Outputs
- Inputs: JSON (see `skills/dev-tools/ps1-optimize/schemas/input.schema.json`).
  - `project.root` must be under `/workspace` when using Docker.
  - Optional: `project.psVersion`, `project.modulePaths`, `includeGlobs`, `excludeGlobs`.
  - `actions[]` (max 20), each with optional `targets.paths` scoping.
- Outputs: JSON `RunResult` with:
  - `data.findings[]` (kinds: `diagnostic|lint|refactor|migration|codegen|recommendation`)
  - `data.patches[]` (unified diffs)
  - `data.metrics` (diagnostics, lintIssues, patchesGenerated, filesModified, etc.)

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Start with a single action (often `debug` or `lint`) and a narrow scope (`targets.paths`).
   - Prefer Docker sandbox execution for consistency (see `skills/dev-tools/ps1-optimize/README.md`).
2) Diagnose
   - Read `data.logs` first (e.g., “pwsh not available” / “PSScriptAnalyzer not available”).
   - Triage findings by kind and severity.
3) Fix
   - Default to patch-only runs.
   - Re-run with `applyFixes=true` only after you accept the patch intent.
4) Verify
   - Run the target project’s tests / smoke checks.
   - Re-run the same input to confirm reduced/stable findings.

## Action cookbook

### debug (PSScriptAnalyzer diagnostics, best-effort)
Use when you need structured diagnostics.

- Levels:
  - `quick`: PSScriptAnalyzer severity `Error`
  - `medium`: `Error` + `Warning`
  - `complex`: `Error` + `Warning` + `Information`

Important behavior:
- If `pwsh` is missing, diagnostics are skipped and logged.
- If PSScriptAnalyzer is not installed/available, diagnostics are skipped and logged.

Example:
```json
{
  "project": { "root": "/workspace", "psVersion": "7.4" },
  "actions": [{ "type": "debug", "debugLevel": "medium", "targets": { "paths": ["scripts"] } }]
}
```

### lint (whitespace + no-write-host findings; optional safe fixes)
Use for deterministic formatting cleanup and basic hygiene.

- Rules:
  - `trim-trailing-whitespace` (auto-fixable)
  - `final-newline` (auto-fixable)
  - `no-write-host` (findings only)

Example (patch-only):
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "lint", "targets": { "paths": ["scripts"] } }]
}
```

Example (apply after review):
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    { "type": "lint", "applyFixes": true, "lintRules": ["trim-trailing-whitespace", "final-newline"], "targets": { "paths": ["scripts"] } }
  ]
}
```

### refactor (currently: format-whitespace)
Use when you want a deterministic formatting refactor as patches.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "refactor", "applyFixes": true, "refactorGoals": ["format-whitespace"], "targets": { "paths": ["scripts"] } }]
}
```

### migrate (command rename rules)
Use for module/cmdlet migrations where simple token-level renames are acceptable.

- `renameCommands` rewrites command tokens using a boundary-aware regex to avoid partial matches.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [
    {
      "type": "migrate",
      "applyFixes": true,
      "migrate": { "renameCommands": [{ "from": "Get-WmiObject", "to": "Get-CimInstance" }] },
      "targets": { "paths": ["scripts"] }
    }
  ]
}
```

### codegen (module index.psm1)
Use to generate `index.psm1` that dot-sources `.ps1` files in a directory.

- `codegen.kind`: `module`
- `codegen.targetDirs`: directories relative to `project.root`
- The generated index is sorted and deterministic.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "codegen", "applyFixes": true, "codegen": { "kind": "module", "targetDirs": ["src"] } }]
}
```

### recommend (security/compat/perf/style guidance)
Use for lightweight guidance and a small amount of text scanning.

Example:
```json
{
  "project": { "root": "/workspace" },
  "actions": [{ "type": "recommend", "recommendFocus": ["security", "compat", "style"] }]
}
```

## Scoping and safety controls (important)
- Prefer narrowing scope:
  - `targets.paths`: paths relative to `project.root` (recommended) or absolute paths.
  - `project.includeGlobs` / `project.excludeGlobs`: reduce the file set early.
- `targets.changedOnly` exists but is ignored; use explicit `targets.paths`.
- The tool hard-rejects paths outside `/workspace` in Docker runs.

## Patch workflow (recommended)
- Run patch-only first (default).
- Re-run with `applyFixes=true` only for the action(s) you accept.
- See `.codex/skills/dev-tools-patches/SKILL.md` for the apply/review workflow.

## Verification (this repo)
```bash
cd skills/dev-tools/ps1-optimize
npm install
npm run build
npm test
```

## Definition of Done
- Input JSON is saved with the work (reproducible).
- Scope is minimal and intentional.
- Patches are reviewed before application.
- Verification passes, and a re-run shows reduced/stable findings.

## Runtime skill reference
- `skills/dev-tools/ps1-optimize/README.md`
- `skills/dev-tools/ps1-optimize/schemas/input.schema.json`

## Suggested future enhancements (not implemented yet)
- Implement `targets.changedOnly` (accept explicit changed-file list; avoid implicit git coupling in the sandbox).
- Add safe migrations beyond cmdlet renames (parameter renames, common alias cleanup) with opt-in rules.
- Offer a richer module/codegen mode (e.g., support subfolders, stable export ordering, or generating `Export-ModuleMember` stubs).
- Improve patch portability (emit relative paths or `a/` + `b/` headers) for easier external application.
