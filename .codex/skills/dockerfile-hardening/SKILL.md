---
name: dockerfile-hardening
description: "Playbook for dockerfile-hardening. Use when writing or reviewing Dockerfiles for security, reproducibility, and maintainability (non-root, pinned versions, minimal images, safe secrets)."
---

# dockerfile-hardening (Playbook)

Use this when authoring or hardening Dockerfiles so they’re safer, smaller, and more reproducible.

## When to use (triggers)
- Creating a new Dockerfile.
- Hardening an existing Dockerfile (security review, supply chain, least privilege).
- Fixing “works locally, fails in CI” due to Docker build differences.

## Inputs / Outputs
- Inputs: target app/runtime, build context, platforms (amd64/arm64), CI environment, constraints (no network at runtime, etc.).
- Outputs: minimal Dockerfile patch + verification commands + rationale for trade-offs.

## Step sequence (Plan -> Harden -> Verify)
1) Plan
   - Decide base image strategy: distroless/alpine/debian-slim (match ecosystem needs).
   - Identify build-time vs runtime dependencies.
2) Harden
   - Apply checklists below (in order).
3) Verify
   - Build with clean cache and run smoke checks.
   - If CI exists: mirror CI build args/platforms.

## Checklist: security defaults
- Use a non-root user for runtime (unless strictly required).
- Avoid `curl | sh` install patterns; prefer package managers with pinned versions.
- Don’t bake secrets into images:
  - no secrets in `ARG` defaults
  - prefer BuildKit secrets mounts where supported
- Drop capabilities only if you understand the runtime requirements (don’t break prod).

## Checklist: reproducibility
- Pin base images to a tag that you control (or digest when appropriate).
- Pin system packages where feasible (or document why not).
- Avoid time-dependent build steps (fetch latest without version).

## Checklist: maintainability
- Use multi-stage builds for compilation toolchains.
- Keep layers stable (copy lockfiles before source to maximize caching).
- Add `.dockerignore` to avoid accidental context bloat.

## Templates
- Hardened Dockerfile skeleton: `assets/Dockerfile.skeleton`
- `.dockerignore` starter: `assets/dockerignore.txt`
- Dockerfile review checklist: `references/dockerfile-checklist.md`

## Definition of Done
- Image runs as non-root (or exception documented).
- No secrets are baked into the image.
- Build is reproducible enough for CI parity; smoke run succeeds.

## Related skills
- `container-security-scans` for CVE/SBOM scanning.
- `docker-image-size-perf` for slimming and caching strategy.

## Credits
- Informed by common Docker hardening best practices and container security guidance; written as a repo-first playbook.
