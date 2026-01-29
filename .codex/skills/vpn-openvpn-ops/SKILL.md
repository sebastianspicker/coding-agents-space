---
name: vpn-openvpn-ops
description: "OpenVPN operations playbook. Use when deploying or debugging OpenVPN (road-warrior or site-to-site): PKI/client profiles, routing vs NAT, split tunnel, DNS push, MTU issues, logging, revocation/rotation, and safe onboarding/offboarding."
---

# vpn-openvpn-ops (Playbook)

Use this to operate OpenVPN in a repeatable, auditable way: stable configs, safe key/cert lifecycle, and deterministic troubleshooting.

## When to use (triggers)
- You need a remote-access VPN (road-warrior) or a site-to-site tunnel.
- Clients connect but traffic/DNS doesn’t work (“connected but no traffic”).
- You are onboarding/offboarding users/devices or rotating credentials.
- You’re tuning latency/MTU or troubleshooting fragmentation.

## Inputs / Outputs
- Inputs: topology (road-warrior/site-to-site), auth model (certs, user/pass, MFA conceptually), required subnets, DNS requirements, firewall posture.
- Outputs: config plan + client inventory + rotation/revocation runbook + connectivity test evidence.

## Step sequence (Design -> PKI -> Configure -> Verify -> Operate -> Rotate)
1) Design
   - Define:
     - which subnets are reachable through the tunnel
     - split tunnel vs full tunnel policy
     - DNS behavior (internal only vs mixed)
2) PKI (client identity)
   - Create client profiles; define naming and lifecycle.
   - Define revocation and rotation procedures.
3) Configure
   - Implement routing vs NAT intentionally; document which and why.
   - Set MTU/fragment/MSS options conservatively; only tune with evidence.
4) Verify
   - Verify:
     - handshake
     - route propagation
     - DNS resolution
     - service reachability (ports)
5) Operate
   - Monitor logs, errors, and unusual auth activity.
   - Keep client inventory current.
6) Rotate/revoke
   - Rotate credentials on schedule; revoke quickly on suspected compromise.

## Common failure modes (diagnostic map)
- Connected but no traffic:
  - missing routes or incorrect iroute/ccd (site-to-site patterns)
  - firewall blocks between VPN interface and target subnet
  - NAT/routing mismatch
- DNS broken:
  - DNS push not applied (client config)
  - split-horizon expectations not met
- MTU issues:
  - large packets stall; small pings work
  - PMTUD blocked by intermediate devices

## Templates
- Client/peer inventory: `assets/client-inventory.md`
- Cert/key rotation + revocation runbook: `assets/rotation-revocation-runbook.md`
- Connectivity test plan: `assets/connectivity-test-plan.md`
- Config change log: `assets/config-change-log.md`
- Troubleshooting checklist: `references/troubleshooting.md`

## Definition of Done
- VPN policy (split/full tunnel, DNS, routes) is documented and enforced.
- Onboarding/offboarding process is repeatable (inventory + revocation).
- Connectivity verified with a test plan and recorded evidence.

## Related skills
- `vpn-wireguard-ops` for WireGuard operations.
- `network-security-baseline` and `network-firewall-review` for policy and rule hygiene.
- `network-testing` for reproducible validation.

