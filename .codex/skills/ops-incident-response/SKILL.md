---
name: ops-incident-response
description: "Operations incident response playbook. Use when handling production incidents with severity, mitigation, communication, evidence collection, and follow-up actions."
---

# ops-incident-response (Playbook)

Use this during an incident to reduce time-to-mitigation and keep communication clear.

## When to use (triggers)
- User reports outage, data loss risk, security exposure, or degraded performance.
- On-call response and coordinated mitigation.

## Inputs / Outputs
- Inputs: symptom, affected scope, environment, start time, recent changes, who is on-call.
- Outputs: incident log/timeline, mitigation steps taken, current status, and follow-up items.

## Severity (starter)
- SEV1: outage / major security exposure / data loss risk
- SEV2: major degradation affecting many users
- SEV3: partial degradation / workaround exists
- SEV4: minor issue / informational

## Step sequence (Triage -> Mitigate -> Communicate -> Stabilize -> Handoff)
1) Triage
   - Confirm impact and scope.
   - Identify the fastest safe mitigation.
2) Mitigate
   - Prefer reversible actions:
     - rollback
     - feature flag off
     - scale up temporarily
3) Communicate
   - Post status updates on a schedule (SEV1 more frequent).
   - Use the comms template; avoid speculation.
4) Stabilize
   - Collect evidence (logs, metrics, timeline).
   - Avoid risky refactors during the incident.
5) Handoff
   - Create/prepare a postmortem and track follow-ups.

## Evidence checklist (minimal)
- logs (sanitized)
- metrics (latency/errors/saturation)
- deploy/commit identifiers
- config changes

## Templates
- Incident log template: `assets/incident-log.md`
- Status update template: `assets/status-update.md`

## Definition of Done
- Mitigation is in place and verified.
- Stakeholders have accurate status and ETA ranges (or “unknown” explicitly).
- Postmortem is scheduled/created with follow-up owners.

## Related skills
- `ops-postmortem` for the write-up and action tracking.
- `ops-observability` for instrumentation improvements after stabilization.
