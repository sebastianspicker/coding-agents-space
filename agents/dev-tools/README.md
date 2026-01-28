# Dev Tools - Overview

This page links runtime skill packages and Codex playbook skills for dev-tools.

## Codex playbook skills (agent guidance)
- [.codex/skills/README.md](../../.codex/skills/README.md) - Full playbook index (TS + PowerShell).

- [ts-debug](../../.codex/skills/ts-debug/SKILL.md) - Debug TypeScript/JavaScript failures with repro -> fix -> verify.
- [ts-refactor](../../.codex/skills/ts-refactor/SKILL.md) - Safe refactors for TS/JS with behavior preserved.
- [ts-quality](../../.codex/skills/ts-quality/SKILL.md) - Quality improvements for TS/JS (lint, types, perf).
- [ts-lint](../../.codex/skills/ts-lint/SKILL.md) - TS/JS lint workflows (small deterministic fixes).
- [ts-dedupe](../../.codex/skills/ts-dedupe/SKILL.md) - Find duplicate-code candidates and plan safe extraction.
- [ts-migrate](../../.codex/skills/ts-migrate/SKILL.md) - API/import migrations with verification gates.
- [ts-codegen](../../.codex/skills/ts-codegen/SKILL.md) - Deterministic codegen (barrels/indices) with review gates.
- [ts-recommend](../../.codex/skills/ts-recommend/SKILL.md) - Turn recommendations into verified tasks.
- [ts-testing](../../.codex/skills/ts-testing/SKILL.md) - Test triage and regression tests (TS/JS).
- [ts-implement](../../.codex/skills/ts-implement/SKILL.md) - Write TS/JS code (feature/bugfix) with tests + verification.
- [ts-runtime-debug](../../.codex/skills/ts-runtime-debug/SKILL.md) - Runtime debugging (repro harness, evidence, minimal fix).
- [ts-build-debug](../../.codex/skills/ts-build-debug/SKILL.md) - Debug TS build/toolchain issues (tsconfig, ESM/CJS, resolution).
- [ts-observability](../../.codex/skills/ts-observability/SKILL.md) - Add structured logging/tracing to make debugging reliable.
- [ts-perf](../../.codex/skills/ts-perf/SKILL.md) - Performance debugging (profiling/benchmarks).
- [ts-bundle](../../.codex/skills/ts-bundle/SKILL.md) - Bundle size and tree-shaking troubleshooting.
- [ts-arch](../../.codex/skills/ts-arch/SKILL.md) - Architecture workflows (cycles/boundaries).
- [ts-deps](../../.codex/skills/ts-deps/SKILL.md) - Dependency health workflows.
- [ps-debug](../../.codex/skills/ps-debug/SKILL.md) - Debug PowerShell scripts/modules with minimal fixes.
- [ps-refactor](../../.codex/skills/ps-refactor/SKILL.md) - Safe refactors for PowerShell scripts/modules.
- [ps-quality](../../.codex/skills/ps-quality/SKILL.md) - Quality improvements for PowerShell (lint, style, perf).
- [ps-diagnostics](../../.codex/skills/ps-diagnostics/SKILL.md) - Diagnose pwsh/PSScriptAnalyzer availability and behavior.
- [ps-lint](../../.codex/skills/ps-lint/SKILL.md) - PowerShell lint workflows (deterministic hygiene).
- [ps-migrate](../../.codex/skills/ps-migrate/SKILL.md) - Command migrations with review + verification.
- [ps-codegen](../../.codex/skills/ps-codegen/SKILL.md) - Deterministic module index codegen.
- [ps-recommend](../../.codex/skills/ps-recommend/SKILL.md) - Turn recommendations into verified tasks.
- [ps-testing](../../.codex/skills/ps-testing/SKILL.md) - Pester/test triage and regression tests.
- [ps-module](../../.codex/skills/ps-module/SKILL.md) - Module packaging hygiene and explicit exports.
- [ps-implement](../../.codex/skills/ps-implement/SKILL.md) - Write PowerShell code (feature/bugfix) with tests + verification.
- [ps-runtime-debug](../../.codex/skills/ps-runtime-debug/SKILL.md) - Runtime debugging (repro harness, evidence, minimal fix).
- [ps-environment](../../.codex/skills/ps-environment/SKILL.md) - PowerShell environment triage (PS version, policy, module paths, signing).
- [ts-optimize cookbook](../../.codex/skills/ts-optimize/SKILL.md) - Running the `ts-optimize` runtime skill (debug/dedupe/lint/migrate/refactor/codegen/recommend).
- [ps1-optimize cookbook](../../.codex/skills/ps1-optimize/SKILL.md) - Running the `ps1-optimize` runtime skill (debug/lint/migrate/refactor/codegen/recommend).
- [dev-tools-run-skill](../../.codex/skills/dev-tools-run-skill/SKILL.md) - Run runtime skills via Docker/local build and produce reproducible JSON output.
- [dev-tools-patches](../../.codex/skills/dev-tools-patches/SKILL.md) - Review/apply patches safely (patch-first, applyFixes workflow).
- [dev-tools-skill-maintenance](../../.codex/skills/dev-tools-skill-maintenance/SKILL.md) - Change runtime skills without breaking contracts (schemas/tests/docs).

## Runtime skills (Node packages)
- [skills/dev-tools/ts-optimize](../../skills/dev-tools/ts-optimize/README.md) - TS/JS diagnostics, fixes, migrations, codegen.
- [skills/dev-tools/ps1-optimize](../../skills/dev-tools/ps1-optimize/README.md) - PowerShell diagnostics, fixes, migrations, codegen.

## Legacy docs
- [docs/archive/legacy-dev-skills](../../docs/archive/legacy-dev-skills/README.md) - archived legacy skill docs.
