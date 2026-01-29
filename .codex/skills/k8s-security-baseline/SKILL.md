---
name: k8s-security-baseline
description: "Kubernetes security baseline playbook. Use when establishing least-privilege RBAC, namespace isolation, service account hygiene, secret handling, pod security defaults, audit logging, and supply-chain hooks (SBOM/scans) without breaking workloads."
---

# k8s-security-baseline (Playbook)

Use this to create a pragmatic Kubernetes security baseline that is reviewable, exception-friendly, and compatible with real workloads.

## When to use (triggers)
- New cluster or new namespace onboarding.
- Hardening after a security review or near-miss.
- You need consistent RBAC/service accounts/secrets practices.
- You’re adding image scanning/SBOM or admission checks (conceptual).

## Inputs / Outputs
- Inputs: cluster type, namespaces, workload inventory, current RBAC, current secret handling, image registry workflow.
- Outputs: baseline report + prioritized hardening plan + exceptions with explicit owners/expiry.

## Step sequence (Inventory -> Baseline -> Enforce -> Exceptions -> Verify)
1) Inventory
   - Enumerate namespaces, service accounts, roles/rolebindings, clusterroles, and secrets usage.
2) Baseline
   - Define a “default safe” posture per namespace (RBAC + pod security + network policy posture).
3) Enforce (incrementally)
   - Apply least privilege and safer defaults in small steps; measure breakage risk.
4) Exceptions
   - Document every exception (why, owner, expiry, compensating controls).
5) Verify
   - Validate workloads still run; run security checks/scans; capture evidence.

## Baseline checklist (starter)
- RBAC
  - Prefer namespace-scoped Roles over ClusterRoles.
  - Avoid wildcard verbs/resources; restrict to required verbs.
  - Separate human/admin access from workload service accounts.
- Namespaces
  - Separate environments/tenants; avoid “everything in default”.
- Service accounts
  - One SA per workload group; avoid reusing default SA.
  - Disable token automount where not needed.
- Secrets
  - Treat secrets as sensitive; avoid printing env dumps to logs.
  - Prefer external secret stores if available; otherwise minimize distribution.
- Pod security
  - Prefer non-root, read-only root filesystem where feasible, drop unnecessary capabilities.
  - Use baseline/restricted policies gradually (implementation depends on cluster).
- Supply chain hooks (conceptual)
  - Image provenance: pin tags/digests; scan images; SBOM capture.
- Audit/logging
  - Ensure you can trace: who changed what, when, and where (control-plane audit if available).

## Templates
- Baseline report: `assets/baseline-report.md`
- Exception template: `references/exception-template.md`

## Definition of Done
- Baseline is documented and applied to at least one namespace.
- Exceptions are tracked with owner/expiry.
- Verification evidence exists (workloads healthy + scans/log checks).

## Related skills
- `container-security-scans` for image scanning and exception policy.
- `security-secrets-hygiene` for secret handling rules.
- `security-audit` for broader findings and reporting.

