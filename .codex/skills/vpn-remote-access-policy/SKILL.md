---
name: vpn-remote-access-policy
description: "Remote access policy playbook. Use when defining organizational VPN/remote admin access: boundaries, MFA/SSO concepts, device posture, logging/retention, break-glass access, and incident procedures with an explicit exception workflow."
---

# vpn-remote-access-policy (Playbook)

Use this to define how remote access should work (policy + controls), independent of the underlying VPN technology.

## When to use (triggers)
- You want a consistent remote access posture across WireGuard/OpenVPN/other.
- You need to define who can reach the management plane and how it’s audited.
- You need a break-glass procedure for outages.

## Inputs / Outputs
- Inputs: admin networks, asset inventory, identity provider constraints, logging/retention requirements, risk tolerance.
- Outputs: remote access policy + break-glass runbook + exception process.

## Step sequence (Scope -> Controls -> Logging -> Break-glass -> Exceptions -> Review)
1) Scope
   - Define:
     - what is “management plane”
     - which networks are allowed to reach it
     - which roles have access
2) Controls
   - Identity: MFA/SSO where possible (conceptual).
   - Least privilege: per-role access to subnets/ports.
   - Device posture: require managed devices where feasible.
3) Logging
   - Define what is logged, retention, and alerting for anomalous access.
4) Break-glass
   - Define a safe “last resort” procedure and when it’s allowed.
5) Exceptions
   - Document exceptions with owner/expiry and compensating controls.
6) Review
   - Review policy and exceptions on a fixed cadence.

## Templates
- Policy template: `assets/policy-template.md`
- Break-glass runbook: `assets/break-glass-runbook.md`
- Checklist: `references/checklist.md`

## Definition of Done
- Policy is written, reviewed, and adopted for at least one environment.
- Break-glass path is documented and tested in a safe setting.
- Exceptions are tracked and reviewed regularly.

## Related skills
- `vpn-wireguard-ops` and `vpn-openvpn-ops`.
- `security-incident-handling` and `ops-incident-response`.

