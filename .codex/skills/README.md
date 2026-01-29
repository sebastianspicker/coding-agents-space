# Codex Playbook Skills

This directory contains **agent playbooks**: repeatable workflows and “cookbooks” for coding/debugging tasks.
They complement (and do not replace) the **runtime skills** under `skills/dev-tools/*`.

## Entry points
- Repo guide + verification rules: [AGENTS.md](../../AGENTS.md)
- Human index for dev-tools: [agents/dev-tools/README.md](../../agents/dev-tools/README.md)
- How to run runtime skills: [dev-tools-run-skill](dev-tools-run-skill/SKILL.md)
- Patch-first workflow: [dev-tools-patches](dev-tools-patches/SKILL.md)
- Naming conventions: [NAMING.md](NAMING.md)

## Validation
- Local sanity check: `python3 scripts/validate-codex-skills.py`
- Reference validator (optional): `skills-ref validate .codex/skills/<skill-name>`

## General engineering guardrails
- [core-debug-root-cause](core-debug-root-cause/SKILL.md) - root-cause-first debugging workflow
- [core-tdd-red-green](core-tdd-red-green/SKILL.md) - Red-Green-Refactor loop for features/bugfixes
- [core-verify-before-claim](core-verify-before-claim/SKILL.md) - evidence gate before claiming success

## Repo maintenance playbooks
- [repo-tool-definitions](repo-tool-definitions/SKILL.md) - update tool definitions and schema references for runners
- [repo-contracts](repo-contracts/SKILL.md) - change shared contracts safely (schemas, compatibility)
- [api-contracts](api-contracts/SKILL.md) - schema-first API changes (OpenAPI/JSON Schema, compatibility, contract tests)
- [openapi-codegen-workflow](openapi-codegen-workflow/SKILL.md) - deterministic OpenAPI codegen + review + versioning
- [patch-review-workflow](patch-review-workflow/SKILL.md) - review/apply patches safely with verification evidence
- [cicd-release-pipelines](cicd-release-pipelines/SKILL.md) - CI/CD pipeline design (envs, secrets, approvals, rollbacks)
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

## Shell playbooks
- [sh-debug](sh-debug/SKILL.md) - debug shell scripts and CI shell steps
- [sh-implement](sh-implement/SKILL.md) - implement safe, CLI-friendly shell scripts
- [sh-quality](sh-quality/SKILL.md) - improve shell script quality safely

## Python playbooks
- [py-debug](py-debug/SKILL.md) - debug Python issues (env, tests, runtime)
- [py-implement](py-implement/SKILL.md) - implement Python features/bugfixes with verification
- [py-testing](py-testing/SKILL.md) - add/fix pytest tests and reduce flakiness
- [py-quality](py-quality/SKILL.md) - lint/format/types quality passes (repo toolchain)
- [py-refactor](py-refactor/SKILL.md) - safe refactors with verification
- [py-codegen](py-codegen/SKILL.md) - deterministic Python code generation with review gates

## Frontend playbooks
- [react-implement](react-implement/SKILL.md) - implement React features with a11y + perf checks
- [next-app-router-workflow](next-app-router-workflow/SKILL.md) - Next.js App Router workflows (RSC, data, SEO)
- [expo-router-workflow](expo-router-workflow/SKILL.md) - Expo Router workflows (navigation + platform diffs)
- [web-playwright-testing](web-playwright-testing/SKILL.md) - Playwright-driven UI testing/debugging

## Music tech playbooks
- [sonic-pi-livecoding-workflow](sonic-pi-livecoding-workflow/SKILL.md) - Sonic Pi performance workflow (routing, cues, safety, recording)
- [sonic-pi-repro-snippets](sonic-pi-repro-snippets/SKILL.md) - reusable, deterministic Sonic Pi snippet library patterns
- [pure-data-patch-engineering](pure-data-patch-engineering/SKILL.md) - Pd patch structure, scheduling/DSP debugging, performance hygiene
- [pd-audio-io-routing](pd-audio-io-routing/SKILL.md) - Pd audio device selection, latency tuning, multi-channel routing docs
- [tonejs-app-workflow](tonejs-app-workflow/SKILL.md) - Tone.js app patterns (AudioContext, scheduling, polyphony, export)
- [web-audio-debug](web-audio-debug/SKILL.md) - Web Audio minimal repro + graph debugging workflow
- [audio-dsp-experiment-workflow](audio-dsp-experiment-workflow/SKILL.md) - DSP experiments with metrics + ABX basics + reproducibility
- [audio-feature-extraction](audio-feature-extraction/SKILL.md) - audio features (STFT/mel/pitch/LUFS) + dataset hygiene
- [music-tech-lab-design](music-tech-lab-design/SKILL.md) - labs/assignments: goals→scaffold→rubric→safety/accessibility
- [student-submission-eval](student-submission-eval/SKILL.md) - grading workflow with light automation and structured feedback

## Ops playbooks
### Containers
- [docker-debug](docker-debug/SKILL.md) - debug Docker/Compose builds and runtime environments
- [dockerfile-hardening](dockerfile-hardening/SKILL.md) - harden Dockerfiles (non-root, pinned deps, safe secrets)
- [docker-image-size-perf](docker-image-size-perf/SKILL.md) - slimming + caching strategies for CI parity
- [docker-compose-production](docker-compose-production/SKILL.md) - “prod-like” Compose patterns (healthchecks, migrations, backups)
- [docker-networking-debug](docker-networking-debug/SKILL.md) - DNS/service discovery/ports/localhost pitfalls
- [container-security-scans](container-security-scans/SKILL.md) - Trivy/Grype/SBOM workflows + exception policy

### Kubernetes
- [k8s-debug](k8s-debug/SKILL.md) - debug pods/workloads/nodes with kubectl evidence
- [k8s-deploy-workflow](k8s-deploy-workflow/SKILL.md) - safe rollouts, migrations, verify gates, rollback planning
- [k8s-networking-debug](k8s-networking-debug/SKILL.md) - Services/DNS/Ingress/NetworkPolicy troubleshooting
- [k8s-storage-debug](k8s-storage-debug/SKILL.md) - PVC/PV/CSI debugging with data-safety-first recovery
- [k8s-observability](k8s-observability/SKILL.md) - Prometheus/Grafana/OTel patterns with SLO alerts + runbooks
- [k8s-security-baseline](k8s-security-baseline/SKILL.md) - RBAC/SA/secrets/pod security baseline + exceptions
- [k8s-cluster-maintenance](k8s-cluster-maintenance/SKILL.md) - upgrades/cordon-drain/policy changes with verification gates
- [helm-release-workflow](helm-release-workflow/SKILL.md) - chart pinning, render/diff gates, verified upgrades
- [kustomize-workflow](kustomize-workflow/SKILL.md) - base/overlays, patch patterns, render/diff gates

### Proxmox VE
- [pve-basics-ops](pve-basics-ops/SKILL.md) - Proxmox VE ops (maintenance, updates, logs, change log)
- [pve-networking](pve-networking/SKILL.md) - Proxmox VE bridges/VLAN/bonds/MTU debugging and testing
- [pve-storage-zfs](pve-storage-zfs/SKILL.md) - Proxmox VE ZFS health, capacity, recovery workflows
- [pve-storage-ceph](pve-storage-ceph/SKILL.md) - Proxmox VE Ceph operations and safe recovery workflows
- [pve-backup-restore](pve-backup-restore/SKILL.md) - backup policy + restore testing (core-verify-before-claim)
- [pve-pbs-ops](pve-pbs-ops/SKILL.md) - Proxmox Backup Server operations (verify + restore drills)
- [pve-vm-templates-cloud-init](pve-vm-templates-cloud-init/SKILL.md) - templates + cloud-init deterministic provisioning
- [pve-security-baseline](pve-security-baseline/SKILL.md) - PVE access/MFA/tokens/firewall baseline + exceptions

### Debian/Linux hosts
- [debian-ops-baseline](debian-ops-baseline/SKILL.md) - Debian host baseline (updates/logs/SSH/firewall/backups)
- [debian-package-debug](debian-package-debug/SKILL.md) - recover broken apt/dpkg states safely
- [debian-kernel-boot-recovery](debian-kernel-boot-recovery/SKILL.md) - break-glass boot recovery (GRUB/initramfs) + verification
- [debian-web-stack](debian-web-stack/SKILL.md) - systemd-run web services + proxy integration
- [linux-service-debug](linux-service-debug/SKILL.md) - debug systemd/journald/networking/permissions issues
- [linux-network-debug](linux-network-debug/SKILL.md) - DNS/routing/firewalls/MTU checks and reproducible debugging
- [linux-storage-debug](linux-storage-debug/SKILL.md) - disk/inodes/mounts/permissions and safe recovery steps
- [linux-tls-debug](linux-tls-debug/SKILL.md) - TLS/cert chain/expiry/SNI/ALPN troubleshooting
- [linux-security-baseline](linux-security-baseline/SKILL.md) - SSH/users/sudo/updates/permissions baseline hardening
- [linux-timers-and-cron](linux-timers-and-cron/SKILL.md) - systemd timers/cron debugging, logging, idempotency
- [log-rotation-debug](log-rotation-debug/SKILL.md) - log growth and rotation failures (journald/logrotate) with safe cleanup

### Networking
- [network-testing](network-testing/SKILL.md) - reproducible LAN/WAN/VPN network tests and results logs
- [network-dns-ops](network-dns-ops/SKILL.md) - DNS inventory/debugging and safe rollout workflow
- [network-security-baseline](network-security-baseline/SKILL.md) - segmentation/firewall/logging baseline + exceptions
- [network-firewall-review](network-firewall-review/SKILL.md) - rule hygiene + verification + exception lifecycle
- [vpn-wireguard-ops](vpn-wireguard-ops/SKILL.md) - WireGuard setup/debugging/key rotation workflow
- [vpn-openvpn-ops](vpn-openvpn-ops/SKILL.md) - OpenVPN ops (PKI, routing, DNS, MTU, rotation/revocation)
- [vpn-remote-access-policy](vpn-remote-access-policy/SKILL.md) - remote access policy (boundaries, logging, break-glass, exceptions)

### Edge and TLS
- [reverse-proxy-nginx](reverse-proxy-nginx/SKILL.md) - Nginx secure-by-default reverse proxy workflow
- [reverse-proxy-traefik](reverse-proxy-traefik/SKILL.md) - Traefik routing/TLS/provider debugging workflow
- [reverse-proxy-caddy](reverse-proxy-caddy/SKILL.md) - Caddy reverse proxy + automatic HTTPS workflow
- [tls-acme-automation](tls-acme-automation/SKILL.md) - ACME issuance/renewal/rotation and verification
- [reverse-proxy-auth](reverse-proxy-auth/SKILL.md) - forward-auth/SSO patterns and cookie/header hardening

### Services and operations
- [postgres-ops](postgres-ops/SKILL.md) - migrations, backups/restore drills, perf triage, pooling
- [redis-ops](redis-ops/SKILL.md) - memory/eviction/persistence hygiene and incident workflows
- [perf-load-testing](perf-load-testing/SKILL.md) - SLO-based load tests with regression gating
- [ops-observability](ops-observability/SKILL.md) - logs/metrics/traces/alerts/runbooks, without leaking secrets
- [ops-incident-response](ops-incident-response/SKILL.md) - severity, mitigation, comms, evidence, handoff
- [ops-postmortem](ops-postmortem/SKILL.md) - blameless postmortems with tracked action items
- [security-secrets-hygiene](security-secrets-hygiene/SKILL.md) - secrets and configuration hygiene (dev/CI/prod)

## Security playbooks
- [security-audit](security-audit/SKILL.md) - security audits with prioritized findings
- [secure-implement](secure-implement/SKILL.md) - implement security-sensitive features safely
- [web-security-audit](web-security-audit/SKILL.md) - web vulnerability/hardening checklist and workflow
- [threat-modeling](threat-modeling/SKILL.md) - assets/actors/trust boundaries, abuse cases, mitigations
- [security-incident-handling](security-incident-handling/SKILL.md) - containment/evidence/rotation/comms workflow
- [supply-chain-security](supply-chain-security/SKILL.md) - SBOM/scanning/pinning policy + exceptions
- [authn-authz-implementation](authn-authz-implementation/SKILL.md) - RBAC/ABAC, sessions/tokens, auditing, rotation runbooks
- [waf-basics](waf-basics/SKILL.md) - WAF rollout (monitor→block) + exceptions + change management

## AI playbooks
- [llm-prompt-workflow](llm-prompt-workflow/SKILL.md) - prompts with structured outputs + injection-aware tests
- [llm-eval-harness](llm-eval-harness/SKILL.md) - evaluation harness (fixtures, scoring, regressions)
- [rag-workflow](rag-workflow/SKILL.md) - RAG ingestion/chunking/metadata, retrieval eval, grounded answers
- [local-llm-ops](local-llm-ops/SKILL.md) - local/on-prem LLM serving ops (perf/privacy/upgrades)
- [prompt-injection-defense](prompt-injection-defense/SKILL.md) - trust boundaries, allowlists, tool gating, adversarial evals
- [local-llm-evals-prod](local-llm-evals-prod/SKILL.md) - online evals, drift detection, safety regressions, rollout/rollback

## Research & documentation playbooks
- [reverse-spec](reverse-spec/SKILL.md) - reverse-engineer specs from code with evidence
- [academic-research](academic-research/SKILL.md) - literature review + claim/citation tracking
- [academic-paper-writing](academic-paper-writing/SKILL.md) - paper drafting workflow (IMRaD baseline)
- [latex-paper-workflow](latex-paper-workflow/SKILL.md) - LaTeX build + BibTeX + reproducible figures/tables
- [astro-literature-tracking](astro-literature-tracking/SKILL.md) - mission/method/target/result matrix + claim/citation discipline
- [astro-paper-claims-and-figures](astro-paper-claims-and-figures/SKILL.md) - claim→evidence→figure registry and reproducible figures
- [exoplanet-transit-workflow](exoplanet-transit-workflow/SKILL.md) - transit photometry workflow (detrend→fit→diagnose→inject/recover)
- [astro-time-series-period-search](astro-time-series-period-search/SKILL.md) - period search with alias/window analysis + significance logging
- [photometry-systematics-debug](photometry-systematics-debug/SKILL.md) - systematics diagnosis (airmass/seeing/pointing) with decision logs
- [eclipsing-binary-analysis](eclipsing-binary-analysis/SKILL.md) - ephemeris + O–C workflow + model fit and residual analysis
- [astro-variability-classification](astro-variability-classification/SKILL.md) - time-aware ML baselines + leakage checks + dataset cards
- [space-mission-lightcurves](space-mission-lightcurves/SKILL.md) - TESS/Kepler-style lightcurve ingestion with provenance/flags logs
- [astro-catalog-query-hygiene](astro-catalog-query-hygiene/SKILL.md) - reproducible catalog queries (crossmatch, caching, logs)
- [bayesian-inference-for-astro](bayesian-inference-for-astro/SKILL.md) - priors/diagnostics/posterior predictive checks for astro models
- [uncertainty-propagation-and-units](uncertainty-propagation-and-units/SKILL.md) - units discipline + uncertainty propagation + constraint tests
- [astro-simulation-repro](astro-simulation-repro/SKILL.md) - reproducible simulation experiments (seeds/sweeps/validation)
- [teaching-simulation-design](teaching-simulation-design/SKILL.md) - didactic simulation design (goals→misconceptions→assessment)
- [phyphox-lab-workflow](phyphox-lab-workflow/SKILL.md) - smartphone labs: calibration/export/privacy/uncertainty
- [classroom-data-analysis-python](classroom-data-analysis-python/SKILL.md) - robust Python workflows for messy classroom data
- [it-runbook-documentation](it-runbook-documentation/SKILL.md) - document servers/processes as runbooks
- [docs-coauthoring](docs-coauthoring/SKILL.md) - co-author Markdown docs with reader testing
- [docs-code-reference](docs-code-reference/SKILL.md) - docstrings/OpenAPI/docs-site workflows with verification

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
