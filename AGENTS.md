# AGENTS

This repo has two layers:
- Runtime skills (Node-based packages under `skills/dev-tools/*`).
- Codex playbook skills (agent guidance under `.codex/skills/*`).

## Repo map
- `skills/dev-tools/ts-optimize/` - runtime skill package (TypeScript/JS optimizer).
- `skills/dev-tools/ps1-optimize/` - runtime skill package (PowerShell optimizer).
- `.codex/skills/` - playbook skills for AI coding agents.
- `.codex/skills/README.md` - playbook index (TS + PowerShell).
- `.codex/skills/ts-optimize/` - cookbook for the `skills/dev-tools/ts-optimize` runtime skill.
- `.codex/skills/ps1-optimize/` - cookbook for the `skills/dev-tools/ps1-optimize` runtime skill.
- `.codex/skills/dev-tools-run-skill/` - how to run runtime skills (Docker/local).
- `.codex/skills/dev-tools-patches/` - patch review/apply workflow.
- `.codex/skills/dev-tools-skill-maintenance/` - runtime skill maintenance playbook.
- `.codex/skills/repo-tool-definitions/` - how to maintain runner tool definitions (names + schema refs).
- `.codex/skills/repo-contracts/` - how to change shared contract schemas safely.
- `.codex/skills/repo-new-runtime-skill/` - how to scaffold a new runtime skill package.
- `.codex/skills/repo-run-commands/` - derive verification commands and where to run them.
- `.codex/skills/repo-bisect-regressions/` - bisect regressions with a deterministic repro.
- `agents/dev-tools/README.md` - human overview + quick links.
- `docs/skill-template.md` - runtime skill template.
- `docs/archive/legacy-dev-skills/` - archived legacy dev-skill docs.
- `contracts/` - shared schemas (manifest, tool-def, run-result, permissions).
- `agent-config/` - tool definitions and agent config.

## Verify changes
Derive commands from each skill's `package.json`.

### ts-optimize
```
cd skills/dev-tools/ts-optimize
npm install
npm run build
npm test
```

### ps1-optimize
```
cd skills/dev-tools/ps1-optimize
npm install
npm run build
npm test
```

## Rules
- Do not break runtime skill packages: avoid moving/renaming `manifest.yaml`, `schemas/*`, `src/*`, or `sandbox/*`.
- Reproduce issues locally before changing behavior.
- Keep diffs small and focused.
