# ps1-optimize (Skill)

A sandboxed **PowerShell Optimizer Skill** for:
- **Diagnostics** via PSScriptAnalyzer (optional, when available)
- **Lint fixes** (whitespace, no-write-host)
- **Module migrations** (command renames)
- **Refactor patches** (format-whitespace)
- **Codegen**: generate `index.psm1` from folders
- **Recommendations** (security/compat/perf/style)

## Best-practice principles (important)
- **Patch-first**: the skill always emits diffs; it only writes changes when `applyFixes=true`.
- **No network** in the sandbox (see `sandbox/permissions.yaml`).
- **Input validation**: the root path must be under `/workspace`.
- **Conservative & deterministic**: only safe transformations are offered as patches.
- **Graceful degradation**: if `pwsh` or PSScriptAnalyzer are unavailable, diagnostics are skipped and logged.

## Special note: TypeScript implementation
This skill is implemented in TypeScript and orchestrates `pwsh`/PSScriptAnalyzer for diagnostics.
It is optimized for IO, patching, and rule orchestration; deep PowerShell AST refactors can be added later via PowerShell tooling.

## Local usage via Docker (recommended)
1) Build the image:
   ```bash
   cd skills/dev-tools/ps1-optimize
   docker build -t ps1-optimize-skill -f sandbox/Dockerfile .
   ```

2) Run the skill on a project (mounted to `/workspace`):
   ```bash
   cat examples/input.quick.json | docker run --rm -i \
     -v "/ABSOLUTE/PATH/TO/YOUR/PS/PROJECT":/workspace \
     ps1-optimize-skill
   ```

## Input/Output
- Input schema: `schemas/input.schema.json`
- Output schema: `schemas/output.schema.json`

Findings include:
- Diagnostics (PSScriptAnalyzer)
- Lint/Refactor hints
- Migrations
- Codegen actions
- Recommendations
- Optional patches (Unified Diff) under `data.patches[]`

## Actions (quick overview)
- **lint**: `lintRules`, e.g. `trim-trailing-whitespace`, `final-newline`, `no-write-host`
- **migrate**: `renameCommands` (command renames)
- **codegen**: `module` generates `index.psm1` with dot-sourcing
- **applyFixes**: writes changes to `/workspace` and always emits patches
- **targets.changedOnly**: currently ignored (use `targets.paths`)
