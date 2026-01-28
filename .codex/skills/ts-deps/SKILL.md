# ts-deps (Playbook)

Use this when you need to debug or improve dependency health in a TS/JS project.

## When to use (triggers)
- Duplicate versions of a dependency.
- Unexpected transitive deps end up in production bundles.
- Supply chain or reproducibility concerns (unpinned versions).

## Inputs / Outputs
- Inputs: lockfile, package manager, dependency graph output, affected import paths.
- Outputs: minimized dependency surface, resolved duplicates, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: capture the dependency problem (duplicate list, bundle report, install warnings).
2) Diagnose: identify who pulls the dependency and whether it can be removed/replaced.
3) Fix: pin/override versions, dedupe, or replace heavy deps; keep diffs isolated.
4) Verify: reinstall/build/test and validate runtime/bundle output.

## Definition of Done
- Dependency issue is reproducible and explained.
- Fix is minimal and does not break installs.
- Verification passes (build/test) and bundle/runtime behavior is unchanged (unless intended).
