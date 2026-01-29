---
name: network-dns-ops
description: "Network DNS operations playbook. Use when operating DNS (authoritative/recursive, split-horizon, caching/TTL discipline): reproducible debugging (NXDOMAIN vs SERVFAIL), monitoring, and safe change rollout with a query test matrix."
---

# network-dns-ops (Playbook)

Use this to run DNS as an operational service: inventory, safe changes, and reproducible debugging.

## When to use (triggers)
- Internal DNS issues, split-horizon confusion, or intermittent resolution failures.
- Rolling out DNS changes (new zones, forwarders, TTL changes).
- Debugging NXDOMAIN vs SERVFAIL vs timeouts.

## Inputs / Outputs
- Inputs: DNS roles (authoritative/recursive), zones, forwarders, caching layers, clients, SLA expectations.
- Outputs: DNS inventory + query test matrix + incident log + change rollout checklist.

## Step sequence (Inventory -> Baseline -> Change -> Verify -> Monitor)
1) Inventory
   - Document:
     - authoritative zones
     - recursive resolvers and forwarders
     - split-horizon rules
2) Baseline
   - Establish baseline queries and expected answers (internal + external).
3) Change
   - Make changes with explicit TTL strategy and rollback plan.
4) Verify
   - Re-run query matrix from representative client networks.
5) Monitor
   - Monitor latency, error codes, and cache behavior; alert on anomalies.

## Error code interpretation (starter)
- NXDOMAIN: name does not exist (often config/zone issue).
- SERVFAIL: resolver failed (upstream failure, DNSSEC issues, recursion problem).
- Timeout: network/transport issues or overloaded resolver.

## Templates
- DNS inventory: `assets/dns-inventory.md`
- Query test matrix: `assets/query-test-matrix.md`
- Incident log: `assets/dns-incident-log.md`
- Debugging notes: `references/debugging.md`

## Definition of Done
- DNS roles/zones are documented and owned.
- Changes are verified via test matrix and monitored.
- Incident postmortem notes exist for major DNS outages.

## Related skills
- `network-testing` and `linux-network-debug`.

