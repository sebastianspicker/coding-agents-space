---
name: network-security-baseline
description: "Network security baseline playbook. Use when defining a pragmatic security posture for networks (segmentation, firewall policy hygiene, inbound/outbound controls, logging, safe remote access/VPN) with an exception workflow and verification checks."
---

# network-security-baseline (Playbook)

Use this to establish a network baseline that reduces exposure without breaking operations.

## When to use (triggers)
- Designing or hardening a network/VLAN layout.
- Reviewing firewall rules and remote access posture.
- Preparing for production or a security audit.

## Inputs / Outputs
- Inputs: network diagram/inventory, assets and trust zones, firewall platforms, remote access model, logging/monitoring.
- Outputs: baseline report + prioritized changes + exception records (owner/expiry).

## Step sequence (Inventory -> Baseline -> Implement -> Verify -> Exceptions)
1) Inventory
   - Identify zones, critical assets, and required flows (who talks to whom).
2) Baseline
   - Define default-deny boundaries and explicitly allowed flows.
3) Implement
   - Apply least exposure rules incrementally; avoid broad “allow any”.
4) Verify
   - Verify required flows with a test plan; confirm logs/alerts work.
5) Exceptions
   - Document deviations with owner/expiry and compensating controls.

## Baseline checklist (starter)
- Segmentation
  - Separate management plane, workloads, and user networks.
- Inbound policy
  - Expose only required services; prefer VPN for admin interfaces.
- Outbound policy
  - Restrict egress where feasible; log/alert on unusual destinations.
- Logging
  - Log denied traffic and key allow rules; ensure retention for incident analysis.
- Remote access
  - VPN with strong identity; key rotation; device posture if applicable.

## Templates
- Baseline report: `assets/baseline-report.md`
- Exception template: `references/exception-template.md`

## Definition of Done
- Baseline documented and applied to a defined scope.
- Verification completed with reproducible network tests.
- Exceptions tracked with owner/expiry.

