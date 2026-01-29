---
name: linux-network-debug
description: "Playbook for linux-network-debug. Use when debugging Linux networking (DNS, routing, firewalls, reverse proxies, MTU, port conflicts) with reproducible checks."
---

# linux-network-debug (Playbook)

Use this to debug “can’t connect” issues on Linux hosts: DNS, routing, firewall, proxies, and port conflicts.

## When to use (triggers)
- Requests time out or connect to wrong destination.
- Host resolves DNS differently than containers or other machines.
- Reverse proxy issues (nginx/caddy/traefik) or TLS termination confusion.

## Inputs / Outputs
- Inputs: host/environment, source→destination, protocol, error logs, recent changes.
- Outputs: root cause, minimal fix, and a verification checklist.

## Step sequence (Observe -> Resolve -> Route -> Filter -> Verify)
1) Observe
   - What’s the exact failure? (timeout, refused, TLS error, 401, etc.)
2) Resolve (DNS)
   - `getent hosts <name>`
   - `resolvectl status` (systemd-resolved)
   - `dig <name>` / `nslookup <name>` (if available)
3) Route
   - `ip addr`
   - `ip route`
   - `ip rule` (policy routing)
4) Filter (firewall)
   - `ss -ltnp` / `ss -lunp`
   - nftables: `nft list ruleset`
   - iptables (legacy): `iptables -S` and `iptables -L -n`
   - ufw: `ufw status verbose` (if used)
5) Verify
   - `curl -v` / `wget -S` / `nc -vz` depending on protocol
   - Verify from both ends if possible

## MTU / fragmentation quick check
- Symptom: works for small payloads, fails for large; VPN/overlay networks.
- Check: `ip link` (MTU), test with smaller packets if needed.

## Templates
- Network debug log: `assets/network-debug-log.md`
- Command cheat sheet: `references/commands.md`

## Definition of Done
- Root cause identified and verified with evidence.
- Fix is minimal and doesn’t weaken security unnecessarily.
- Verification steps recorded.
