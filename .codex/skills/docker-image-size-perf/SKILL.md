---
name: docker-image-size-perf
description: "Playbook for docker-image-size-perf. Use when reducing Docker image size and improving build performance (layer caching, BuildKit/buildx, CI parity) without changing app behavior."
---

# docker-image-size-perf (Playbook)

Use this to slim images and speed builds while preserving correctness and CI parity.

## When to use (triggers)
- Image builds are slow or time out in CI.
- Images are large and push/pull is slow.
- Cache misses happen unexpectedly between commits.

## Inputs / Outputs
- Inputs: Dockerfile(s), build commands, CI logs, target platforms, constraints (must keep alpine/debian, etc.).
- Outputs: minimal patch + before/after metrics (size/build time) + verification commands.

## Step sequence (Measure -> Optimize -> Verify)
1) Measure
   - Record baseline size and build time (cold + warm).
2) Optimize
   - Apply caching and slimming patterns (below).
3) Verify
   - Build with `--no-cache` once (correctness).
   - Build again with cache enabled (performance).

## Caching strategies (high leverage)
- Copy lockfiles before source.
- Separate dependency install from app build.
- Use BuildKit and explicit cache mounts when appropriate.
- Avoid invalidating cache with timestamps or unneeded files in context (`.dockerignore`).

## Slimming strategies (high leverage)
- Multi-stage builds: toolchain stays in build stage.
- Remove build artifacts you don’t need in runtime.
- Prefer minimal runtime bases consistent with the ecosystem.

## Templates
- Measurement log: `assets/measurements.md`
- Build commands (BuildKit/buildx): `references/build-commands.md`

## Definition of Done
- Size/build performance improves with evidence.
- Behavior unchanged; smoke checks pass.
- CI build remains reproducible.
