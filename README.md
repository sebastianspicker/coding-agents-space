# coding-agents-space

A skill-first repository layout for building and shipping **Coding Agent Skills** with strict schemas,
sandboxed execution, and testable implementations.

This repo includes the following skills:

- `skills/dev-tools/ts-optimize` — Debugging (quick/medium/complex), dedupe detection, lint fixes, API migrations,
  refactor patches, codegen (barrels), and optimization recommendations for web + scientific/numerics code.
- `skills/dev-tools/ps1-optimize` — Diagnostics, lint fixes, module migrations, refactor patches, codegen (index.psm1),
  and recommendations for PowerShell projects.

## Quick start (skill)
See `skills/dev-tools/ts-optimize/README.md` or `skills/dev-tools/ps1-optimize/README.md`.

## Layout
- `contracts/` — shared schemas (manifest, tool-def, run-result, permissions)
- `skills/<domain>/<skill>/` — each skill is self-contained
