# Skill naming and organization (guidelines)

This repo keeps skills in a flat directory (`.codex/skills/<skill-name>/`) to match AgentSkills conventions.
To keep the index readable, we use **prefixes** to group by topic.

## Prefix conventions
- `core-*`: cross-cutting engineering guardrails (debugging, TDD, verification)
- `ts-*`, `ps-*`, `py-*`, `sh-*`: language workflows
- `docker-*`: containers and builds
- `k8s-*`: Kubernetes
- `pve-*`: Proxmox VE (hypervisor, storage, backups)
- `debian-*`: Debian host operations
- `network-*`: networking operations and policy
- `vpn-*`: remote access / VPN operations and policy
- `reverse-proxy-*`: edge proxies
- `ops-*`: operational workflows (incident response, postmortems, observability)
- `security-*`: security-focused workflows (secrets, audits, hardening)
- `perf-*`: performance-focused workflows (load testing, profiling)

## Naming rules
- Prefer action/workflow names: `*-debug`, `*-workflow`, `*-ops`, `*-baseline`, `*-maintenance`.
- Avoid tool/provider lock-in in the name unless it’s essential (e.g., `reverse-proxy-nginx` is tool-specific on purpose).
- Keep names short and specific; avoid “general” duplicates when a specific prefix exists.

## Dedupe approach
- Prefer linking to an existing skill in “Related skills” instead of copying large blocks of text.
- If two skills share a workflow core, keep the core in one skill and make the other focus on domain-specific deltas.
