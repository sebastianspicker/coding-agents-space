---
name: container-security-scans
description: "Playbook for container-security-scans. Use when scanning container images for CVEs/SBOM and enforcing a remediation policy (Trivy/Grype) with actionable output."
---

# container-security-scans (Playbook)

Use this to run container security scans and turn results into a practical remediation plan.

## When to use (triggers)
- Before shipping images to prod.
- After dependency/base image upgrades.
- When security-audit finds container-related risk.

## Inputs / Outputs
- Inputs: image name(s)/tags, build pipeline, base image strategy, risk tolerance, exception policy.
- Outputs: scan results summary + prioritized remediation + documented exceptions.

## Step sequence (Scan -> Triage -> Remediate -> Re-scan)
1) Scan
   - Run Trivy/Grype if available; otherwise do a manual base image + dependency review.
2) Triage
   - Focus on reachable vulns in runtime stage first.
   - Separate build-only deps vs runtime deps.
3) Remediate
   - Update base image or affected packages.
   - Prefer minimal upgrades with verification.
4) Re-scan
   - Confirm the vulnerability count/severity improves.

## Policy (starter)
- Fail build on:
  - Critical CVEs in runtime image with known fixes available.
- Allow exceptions only with:
  - documented justification + expiry date + tracking issue.

## Templates
- Scan report template: `assets/scan-report.md`
- CI job snippet template: `assets/ci-snippet.yml`
- Exception template: `references/exception-template.md`

## Definition of Done
- Scan is reproducible and results are recorded.
- Remediation plan is prioritized and actionable.
- Exceptions are time-bounded and documented.

## Related skills
- `dockerfile-hardening` for base image and build hygiene.
- `security-audit` for broader security review.
