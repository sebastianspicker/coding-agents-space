---
name: pve-networking
description: "Proxmox VE networking playbook. Use when designing or debugging PVE networking (bridges vmbr*, VLAN tagging, bonds/LACP, MTU, routing, PVE firewall zones) and when VMs have no connectivity or asymmetric connectivity."
---

# pve-networking (Playbook)

Use this to debug and operate PVE networking with a reproducible test plan and a clear inventory of bridges/VLANs/subnets.

## When to use (triggers)
- VM/CT cannot reach gateway, internet, or other VLANs.
- Host has connectivity but VMs don’t (or vice versa).
- After changing bridges, VLANs, bonds, MTU, or firewall rules.

## Inputs / Outputs
- Inputs: NIC inventory, bridge layout, VLAN/subnet plan, firewall posture, MTU requirements.
- Outputs: network inventory + test plan results + minimal fix + verification evidence.

## Step sequence (Inventory -> Test -> Localize -> Fix -> Verify)
1) Inventory
   - Record NICs, bridges, VLANs, subnets, routes, and firewall zones.
2) Test
   - Use a deterministic test plan (ARP/DNS/ping/trace) from host and a VM.
3) Localize
   - Identify failure domain: VM config, bridge/VLAN tagging, host routing, upstream switch/router, firewall.
4) Fix
   - Apply minimal changes; avoid making multiple network changes at once.
5) Verify
   - Repeat the test plan and record results.

## Common pitfalls
- VLAN tagging mismatch (untagged vs tagged trunk).
- Bond/LACP misconfiguration with upstream switch.
- MTU mismatch (especially with VLANs, tunnels, or storage networks).
- Firewall enabled without required rules (host or PVE firewall).
- Wrong default gateway or missing routes.

## Templates
- Network inventory: `assets/network-inventory.md`
- Network test plan: `assets/network-test-plan.md`
- Troubleshooting checklist: `references/troubleshooting.md`

## Definition of Done
- Connectivity issue is localized to a specific hop/layer with evidence.
- Fix is applied minimally and verified by rerunning the test plan.
- Any firewall exceptions are documented with owner and rationale.

