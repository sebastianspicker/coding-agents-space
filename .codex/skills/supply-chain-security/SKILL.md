---
name: supply-chain-security
description: "Supply chain security playbook. Use when hardening dependency and build provenance (SBOM, scanning gates, pinning/lockfiles, artifact integrity, exception policy) and when deciding fix-now vs accept with documented risk."
---

# supply-chain-security (Playbook)

Use this to reduce software supply chain risk with pragmatic, verifiable controls.

## When to use (triggers)
- Introducing new dependencies or build pipelines.
- Responding to CVEs or dependency supply-chain incidents.
- Establishing SBOM/scanning policy for production artifacts.

## Inputs / Outputs
- Inputs: language ecosystems, build pipeline, artifact repositories, current scanning tools, risk tolerance.
- Outputs: policy + implementation plan + exception workflow + verification evidence.

## Step sequence (Inventory -> Policy -> Implement -> Gate -> Review)
1) Inventory
   - Identify dependencies, registries, and artifact outputs.
2) Policy
   - Define severity thresholds and “fix now vs accept” criteria.
3) Implement
   - Enforce lockfiles/pinning; reduce unpinned downloads.
4) Gate
   - Add scan/SBOM gates in CI where feasible; keep noise manageable.
5) Review
   - Review exceptions regularly; remove when no longer needed.

## Policy checklist (starter)
- Pin dependencies (lockfiles, digests) and document update cadence.
- Generate SBOM for deployable artifacts.
- Scan dependencies and container images; define thresholds.
- Require review for dependency additions (especially transitive explosions).
- Maintain an exception template (owner/expiry/rationale).

## Templates
- Policy document: `assets/policy.md`
- Exception template: `references/exception-template.md`

## Definition of Done
- Policy exists and is applied to at least one pipeline/artifact.
- Exceptions are tracked with expiry and reviewed.
- Verification evidence exists (scan outputs, SBOM generation).

## Related skills
- `repo-security-deps` and `container-security-scans`.

