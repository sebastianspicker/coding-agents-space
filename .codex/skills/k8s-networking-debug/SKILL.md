---
name: k8s-networking-debug
description: "Kubernetes networking debugging playbook. Use when diagnosing DNS/CoreDNS, Services/Endpoints, Ingress, NetworkPolicies, MTU issues, and localhost/port-forward pitfalls with reproducible in-cluster tests."
---

# k8s-networking-debug (Playbook)

Use this when traffic doesn’t flow in Kubernetes: DNS failures, Services without endpoints, Ingress routing issues, or network policy blocks.

## When to use (triggers)
- “Service exists but requests fail” or time out.
- DNS resolution failures inside pods.
- Ingress returns 404/502/503 or TLS confusion.
- NetworkPolicy rollout breaks connectivity.
- Port-forward works but in-cluster traffic fails (or vice versa).

## Inputs / Outputs
- Inputs: namespace, source pod (client), target service/host, Ingress/controller type, any NetworkPolicies.
- Outputs: connectivity matrix + minimal fix + verification evidence.

## Step sequence (Map -> Test -> Localize -> Fix -> Verify)
1) Map
   - Identify: source (pod), destination (service/ingress), path/port/protocol.
2) Test (in cluster)
   - Run DNS and TCP/HTTP checks from a disposable debug pod.
3) Localize
   - Determine which hop fails (pod -> service -> endpoints -> ingress -> external).
4) Fix
   - Apply minimal changes (endpoints, selectors, policies, ingress rules).
5) Verify
   - Repeat the same in-cluster tests and record results.

## Common failure causes
- Service selector doesn’t match pods -> no endpoints.
- CoreDNS issues or wrong DNS search path assumptions.
- Ingress misroutes due to host/path rules or missing annotations.
- NetworkPolicy default-deny introduced without required allow rules.
- MTU mismatch causing flaky large responses.

## Templates
- Connectivity matrix: `assets/connectivity-matrix.md`
- tcpdump/pcap plan (non-exploit): `assets/pcap-plan.md`
- Command snippets: `references/network-commands.md`

## Definition of Done
- The failing hop is identified with evidence (tests + outputs).
- Fix is applied minimally and verified from inside the cluster.
- If a policy change: exceptions are documented (why traffic is allowed).

## Related skills
- `linux-network-debug` for node-level DNS/routing/firewall checks.
- `k8s-debug` for pod crash/scheduling issues adjacent to networking.

