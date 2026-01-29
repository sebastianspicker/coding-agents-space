---
name: network-testing
description: "Network testing playbook. Use when you need reproducible LAN/WAN/VPN network tests (latency/jitter/throughput/loss, DNS correctness, MTU/PMTUD) and a results log suitable for debugging and change validation."
---

# network-testing (Playbook)

Use this to plan and execute network tests that produce actionable evidence.

## When to use (triggers)
- After network changes (routing, firewall, VLANs, VPNs, MTU changes).
- Investigating intermittent connectivity or performance issues.
- Validating a new site-to-site link or remote access setup.

## Inputs / Outputs
- Inputs: endpoints (source/dest), expected paths, allowed tools, test window, constraints (no disruptive tests).
- Outputs: test plan + results log + conclusions with confidence and follow-ups.

## Step sequence (Plan -> Baseline -> Test -> Compare -> Record)
1) Plan
   - Define endpoints and success criteria (e.g., “<50ms p95 latency, <1% loss”).
2) Baseline
   - Capture baseline from a known-good state (if possible).
3) Test
   - Run tests for DNS, reachability, latency, loss, and throughput (as permitted).
4) Compare
   - Compare against baseline and identify regressions.
5) Record
   - Write the results log with exact commands and timestamps.

## Test categories (starter)
- DNS correctness: resolution, search domains, split-horizon behavior.
- Reachability: TCP/UDP connectivity and port availability.
- Latency/jitter/loss: stable sampling over time.
- Throughput: only if allowed (may be disruptive); schedule appropriately.
- MTU/PMTUD: detect fragmentation-related issues.

## Templates
- Test plan: `assets/test-plan.md`
- Results log: `assets/results-log.md`
- Tool-agnostic command ideas: `references/command-ideas.md`

## Definition of Done
- Tests executed as planned (or deviations documented).
- Results include commands, timestamps, and environment details.
- Clear next action is identified (fix, monitor, or escalate).

## Related skills
- `linux-network-debug` and `docker-networking-debug` / `k8s-networking-debug` for environment-specific diagnosis.

