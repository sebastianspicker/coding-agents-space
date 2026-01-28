# Codex Playbook Skills

This directory contains **agent playbooks**: repeatable workflows and “cookbooks” for coding/debugging tasks.
They complement (and do not replace) the **runtime skills** under `skills/dev-tools/*`.

## Entry points
- Repo guide + verification rules: [AGENTS.md](../../AGENTS.md)
- Human index for dev-tools: [agents/dev-tools/README.md](../../agents/dev-tools/README.md)
- How to run runtime skills: [dev-tools-run-skill](dev-tools-run-skill/SKILL.md)
- Patch-first workflow: [dev-tools-patches](dev-tools-patches/SKILL.md)

## Repo maintenance playbooks
- [repo-tool-definitions](repo-tool-definitions/SKILL.md) - update tool definitions and schema references for runners
- [repo-contracts](repo-contracts/SKILL.md) - change shared contracts safely (schemas, compatibility)
- [repo-new-runtime-skill](repo-new-runtime-skill/SKILL.md) - add a new runtime skill package from template to verified runtime
- [repo-git-pr-workflow](repo-git-pr-workflow/SKILL.md) - branch/commit/PR workflow for reviewable changes
- [repo-ci-triage](repo-ci-triage/SKILL.md) - reproduce and fix CI failures systematically
- [repo-code-review](repo-code-review/SKILL.md) - review playbook (correctness, security, contracts, tests)
- [repo-security-deps](repo-security-deps/SKILL.md) - dependency vulnerabilities and lockfile hygiene
- [repo-docs-examples](repo-docs-examples/SKILL.md) - keep docs/examples consistent with schemas and behavior
- [repo-run-commands](repo-run-commands/SKILL.md) - derive the right verify commands in mono/workspace repos
- [repo-release-versioning](repo-release-versioning/SKILL.md) - versioning and release workflow (SemVer discipline)
- [repo-bisect-regressions](repo-bisect-regressions/SKILL.md) - find the first bad commit with a deterministic repro

## TypeScript playbooks
- [ts-debug](ts-debug/SKILL.md) - debug TS/JS issues (repro -> diagnose -> fix -> verify)
- [ts-refactor](ts-refactor/SKILL.md) - safe refactors with behavior preserved
- [ts-quality](ts-quality/SKILL.md) - quality improvements (lint/types/perf), verification-first
- [ts-optimize](ts-optimize/SKILL.md) - cookbook for the runtime skill at `skills/dev-tools/ts-optimize`
- [ts-lint](ts-lint/SKILL.md) - linting workflows (runtime skill + eslint/tsc patterns)
- [ts-dedupe](ts-dedupe/SKILL.md) - duplicate-code hunting and follow-up refactors
- [ts-migrate](ts-migrate/SKILL.md) - API/import migrations with safety checks
- [ts-codegen](ts-codegen/SKILL.md) - safe codegen patterns (barrels/indices) with review gates
- [ts-recommend](ts-recommend/SKILL.md) - turning recommendations into verified tasks
- [ts-testing](ts-testing/SKILL.md) - test triage + regression test creation
- [ts-perf](ts-perf/SKILL.md) - performance debugging (profiling, flamegraphs, benchmarks)
- [ts-bundle](ts-bundle/SKILL.md) - web/bundle size + tree-shaking troubleshooting
- [ts-arch](ts-arch/SKILL.md) - cycles/layering/boundaries and dependency direction
- [ts-deps](ts-deps/SKILL.md) - dependency health (duplication, version pinning, lockfiles)
- [ts-implement](ts-implement/SKILL.md) - write code (features/bugfixes) with tests and verification
- [ts-runtime-debug](ts-runtime-debug/SKILL.md) - runtime debugging (repro harness, evidence, minimal fix)
- [ts-build-debug](ts-build-debug/SKILL.md) - debug TS toolchain/build issues (tsconfig, ESM/CJS, resolution)
- [ts-observability](ts-observability/SKILL.md) - add structured logging/tracing to make debugging reliable

## PowerShell playbooks
- [ps-debug](ps-debug/SKILL.md) - debug PowerShell issues (repro -> diagnose -> fix -> verify)
- [ps-refactor](ps-refactor/SKILL.md) - safe refactors with behavior preserved
- [ps-quality](ps-quality/SKILL.md) - quality improvements (lint/style/perf), verification-first
- [ps1-optimize](ps1-optimize/SKILL.md) - cookbook for the runtime skill at `skills/dev-tools/ps1-optimize`
- [ps-diagnostics](ps-diagnostics/SKILL.md) - PSScriptAnalyzer/pwsh environment triage
- [ps-lint](ps-lint/SKILL.md) - linting workflows (runtime skill + analyzer patterns)
- [ps-migrate](ps-migrate/SKILL.md) - command migrations and compatibility moves
- [ps-codegen](ps-codegen/SKILL.md) - module index generation and deterministic exports
- [ps-recommend](ps-recommend/SKILL.md) - turning recommendations into verified tasks
- [ps-testing](ps-testing/SKILL.md) - Pester basics, test triage, regression tests
- [ps-module](ps-module/SKILL.md) - module packaging hygiene (psd1/psm1 layout, exports, versions)
- [ps-implement](ps-implement/SKILL.md) - write code (features/bugfixes) with tests and verification
- [ps-runtime-debug](ps-runtime-debug/SKILL.md) - runtime debugging (repro harness, evidence, minimal fix)
- [ps-environment](ps-environment/SKILL.md) - environment/debugging playbook (PS versions, PSModulePath, policy, signing)
