---
name: vpn-wireguard-ops
description: "WireGuard VPN operations playbook. Use when deploying or debugging WireGuard (keys, routing, MTU, split tunnel, peer management) and documenting rotation and verification steps without exposing secrets."
---

# vpn-wireguard-ops (Playbook)

Use this to operate WireGuard safely: deterministic config, key rotation, and reliable debugging of connectivity.

## When to use (triggers)
- Setting up a new WireGuard tunnel (site-to-site or remote access).
- Debugging “handshake but no traffic”, routing issues, or MTU problems.
- Rotating keys or adding/removing peers.

## Inputs / Outputs
- Inputs: topology (site-to-site/road warrior), subnets, allowed IPs, routing requirements, DNS needs, MTU constraints.
- Outputs: runbook + peer inventory + verification steps + rotation plan.

## Step sequence (Design -> Configure -> Verify -> Operate -> Rotate)
1) Design
   - Define allowed IPs and routing intentionally (avoid overlapping subnets).
2) Configure
   - Apply configs with secrets handled safely (no logs with private keys).
3) Verify
   - Verify handshake + actual traffic for intended subnets.
4) Operate
   - Monitor health and logs; keep peer inventory current.
5) Rotate
   - Rotate keys on a schedule and after suspicion of compromise.

## Common pitfalls
- Wrong `AllowedIPs` causing traffic blackholes.
- Missing routes or NAT requirements.
- MTU mismatch causing flaky behavior (especially over WAN).
- DNS not set for remote peers (split-horizon).

## Templates
- Peer inventory: `assets/peer-inventory.md`
- Rotation runbook: `assets/key-rotation.md`
- Troubleshooting checklist: `references/troubleshooting.md`

## Definition of Done
- Connectivity verified for intended subnets and DNS behavior documented.
- Peer inventory and rotation schedule exist.

