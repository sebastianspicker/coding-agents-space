---
name: redis-ops
description: "Redis operations playbook. Use when operating Redis for production: persistence strategy, memory/eviction policy, keyspace hygiene, latency spikes, replication/HA (conceptual), and incident workflows with safe configuration and verification."
---

# redis-ops (Playbook)

Use this to operate Redis safely: predictable memory behavior, durability expectations, and a repeatable incident workflow.

## When to use (triggers)
- Evictions or OOM; cache hit rate collapses.
- Latency spikes or timeouts.
- Persistence (AOF/RDB) decisions and incident recovery concerns.
- You need keyspace hygiene and TTL discipline.

## Inputs / Outputs
- Inputs: use case (cache/queue/session), durability requirements, memory limits, persistence/replication posture.
- Outputs: config review + incident log + verification and follow-ups.

## Step sequence (Classify -> Configure -> Monitor -> Triage -> Verify)
1) Classify
   - Decide if Redis is cache-only or holds critical state (impacts persistence and recovery).
2) Configure
   - Set maxmemory and eviction policy intentionally; define TTL policy.
3) Monitor
   - Monitor memory, evictions, latency, and keyspace size.
4) Triage
   - For incidents: identify whether it’s memory pressure, slow commands, or network/client issues.
5) Verify
   - Verify stability and document preventive actions.

## Templates
- Config review: `assets/config-review.md`
- Incident log: `assets/incident-log.md`
- Eviction checklist: `references/eviction-checklist.md`

## Definition of Done
- Redis role and durability expectations are documented.
- Memory/eviction and TTL policy are defined and monitored.
- Incidents have follow-ups (client behavior fixes, sizing, key hygiene).

