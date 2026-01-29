---
name: repo-release-versioning
description: "Playbook for repo-release-versioning. Use when You're preparing a release of a package/tool; you changed a contract or runtime behavior and need versioning discipline; you need to decide SemVer impact (patch/minor/major)."
---

# repo-release-versioning (Playbook)

Use this when you need to **ship** changes: version bumps, changelog entries, tags, and release notes.

## When to use (triggers)
- You're preparing a release of a package/tool.
- You changed a contract or runtime behavior and need versioning discipline.
- You need to decide SemVer impact (patch/minor/major).

## Inputs / Outputs
- Inputs: change summary, breaking-change assessment, current version(s), release process requirements.
- Outputs: version bump(s), changelog/release notes, tags (if used), and verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Identify the releasable unit (repo release vs package release).
2) Diagnose
   - Classify the change:
     - Patch: bugfix, no API/contract break.
     - Minor: additive features, backward compatible.
     - Major: breaking contract/API/behavior changes.
3) Fix
   - Apply the version bump and write release notes that mention:
     - what changed
     - who is impacted
     - migration steps (if any)
4) Verify
   - Run verification commands for all released packages.
   - Ensure docs/examples are consistent with the release.

## Notes for this repo
- Shared contracts live under `contracts/`; contract changes should be reflected in release notes for any consumers.
- Runtime skills live under `skills/dev-tools/*`; changes should be verified per package.

## Definition of Done
- Versioning matches the compatibility impact.
- Release notes are accurate and actionable.
- Verification passes for the released scope.
