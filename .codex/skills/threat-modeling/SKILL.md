---
name: threat-modeling
description: "Threat modeling playbook. Use when designing or changing systems with security impact: identify assets, actors, and trust boundaries; enumerate abuse cases; and map mitigations while separating evidence from assumptions."
---

# threat-modeling (Playbook)

Use this to produce a practical threat model that directly informs implementation and review.

## When to use (triggers)
- New feature with auth, payments, data access, or admin interfaces.
- Integrations with third-party services.
- Before a security review or as follow-up to audit findings.

## Inputs / Outputs
- Inputs: system diagram (or code), data classification, user roles, trust boundaries, deployment environment.
- Outputs: threat model document + prioritized mitigations + verification plan.

## Step sequence (Scope -> Model -> Abuse -> Mitigate -> Verify)
1) Scope
   - Define what is in/out of scope and the critical assets.
2) Model
   - Identify actors, entry points, and trust boundaries.
3) Abuse cases
   - Enumerate plausible abuse scenarios (not exhaustive).
4) Mitigations
   - Map mitigations to abuse cases; note residual risk.
5) Verify
   - Define how mitigations will be verified (tests, logs, review checks).

## Templates
- Threat model worksheet: `assets/threat-model.md`
- Abuse case checklist: `references/abuse-checklist.md`

## Definition of Done
- Threat model exists and is reviewed.
- Mitigations are assigned and verifiable.
- Assumptions are clearly labeled.

## Related skills
- `security-audit` and `secure-implement`.
- `web-security-audit` for web-specific threats.
