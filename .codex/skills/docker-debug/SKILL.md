---
name: docker-debug
description: "Playbook for docker-debug. Use when debugging Docker builds, containers, or docker compose environments (health, networking, volumes, CI parity) with reproducible evidence."
---

# docker-debug (Playbook)

Use this for issues that appear in Docker/Compose or CI containers: build failures, runtime crashes, missing deps, networking, and data/volume surprises.

## When to use (triggers)
- `docker build` fails or produces different artifacts than local.
- Container starts but app is unhealthy / crashes / can’t reach dependencies.
- Compose environment behaves differently across machines or CI.

## Inputs / Outputs
- Inputs: Dockerfile/compose files, exact commands, logs, expected behavior, environment (OS, Docker version).
- Outputs: root cause, minimal fix, and a deterministic verification path.

## Step sequence (Repro -> Inspect -> Narrow -> Fix -> Verify)
1) Repro
   - Record commands and versions:
     - `docker version`
     - `docker compose version`
   - Reproduce with the smallest failing target (single service, single build stage).
2) Inspect
   - Containers:
     - `docker ps -a`
     - `docker logs <container>`
     - `docker inspect <container>`
   - Compose:
     - `docker compose ps`
     - `docker compose logs -f --tail=200`
3) Narrow
   - Build issues: isolate stage and dependency that fails.
   - Runtime issues: confirm env vars, mounts, working directory, entrypoint/cmd.
   - Networking: verify service discovery and ports (container-to-container, host-to-container).
4) Fix
   - Prefer minimal changes:
     - pin versions when breakage is due to drift
     - make paths explicit
     - add healthchecks when readiness is required
5) Verify
   - Re-run the same docker/compose commands.
   - If CI exists: mirror the job inputs as closely as possible.

## Common failure classes (checklist)
- Build context missing required files (COPY paths wrong).
- Wrong platform/arch images (`linux/amd64` vs `linux/arm64`).
- Non-root permissions on mounted volumes.
- Env var mismatch between local and CI.
- Service readiness vs “container started” (needs healthcheck + wait).

## Templates
- Compose incident log: `assets/compose-debug-log.md`
- Minimal healthcheck examples: `references/healthchecks.md`

## Definition of Done
- Root cause is evidenced (not guessed).
- Fix is minimal and does not weaken security unnecessarily.
- Repro and relevant checks pass.

## Related skills
- `it-runbook-documentation` to record final operational procedures.
- `core-verify-before-claim` before claiming the container/build is fixed.

## Credits
- Influenced by DevOps/SRE debugging patterns from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (adapted into a Docker/Compose-focused triage workflow).
