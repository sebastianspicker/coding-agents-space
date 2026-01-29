---
name: ops-observability
description: "Operations observability playbook. Use when you need reliable logs/metrics/traces for debugging incidents, reducing MTTR, adding alerts/runbooks, or instrumenting a service without leaking secrets."
---

# ops-observability (Playbook)

Use this to make systems *observable enough* to debug and operate safely: consistent logs, minimal metrics, actionable alerts, and (optionally) traces.

## When to use (triggers)
- Debugging is slow because there’s no evidence (missing logs/metrics/traces).
- Incidents keep recurring without clear signals or runbooks.
- You’re adding a new service and want “ops-ready” instrumentation.
- You need to add temporary debug logging without exposing secrets.

## Inputs / Outputs
- Inputs: service boundaries, deployment environment(s), current logging/metrics stack, known failure modes, SLIs/SLOs (if any).
- Outputs: instrumentation plan + minimal patches (code + config) + dashboards/alerts/runbook stubs + verification steps.

## Step sequence (Define -> Instrument -> Alert -> Runbook -> Verify)
1) Define
   - Pick *one* user-facing objective (e.g., “checkout requests succeed fast”).
   - Define SLIs (what to measure) and rough SLO targets (what “good” means).
2) Instrument (minimum viable)
   - Logs: structured, correlated, sampled where needed.
   - Metrics: “Golden signals” (latency, traffic, errors, saturation).
   - Traces: add spans at service boundaries if you already have tracing; otherwise defer.
3) Alert (actionable only)
   - Alert on symptoms (SLO burn, error rate, latency) before causes.
   - Every alert must have an owner and a runbook link (even if stub).
4) Runbook
   - Add “how to confirm”, “how to mitigate”, and “how to roll back” sections.
5) Verify
   - Prove signals work in a controlled failure (local, staging, or a safe canary).
   - Confirm logs/metrics/traces include correlation identifiers.

## Logging rules (safe + useful)
- Use structured logs (JSON or key=value) with stable keys.
- Include correlation identifiers:
  - `request_id` (or equivalent)
  - `trace_id` / `span_id` if tracing exists
  - `user_id` only if allowed and privacy-reviewed (often a hashed/opaque id)
- Never log secrets or sensitive payloads:
  - passwords, tokens, session cookies, auth headers, private keys
  - full request bodies by default
- Prefer *events* over verbose dumps:
  - “payment_provider_timeout” with fields (`provider`, `timeout_ms`, `attempt`)

## Metrics minimum (golden signals)
- Traffic: requests/sec (by route or operation)
- Errors: 4xx/5xx rate (and a small set of domain error classes)
- Latency: p50/p95/p99 (by route or operation)
- Saturation: CPU, memory, DB connections, queue depth (choose what actually binds)

## Alert quality checklist
- Condition is crisp (no “maybe” alerts).
- Has a link to dashboard + runbook.
- Has a severity and paging policy.
- Doesn’t flap under normal deploys (use multi-window or burn-rate patterns when possible).
- Can be tested (inject known bad condition in non-prod).

## Templates
- Instrumentation plan: `assets/instrumentation-plan.md`
- Runbook stub: `assets/runbook-stub.md`
- Logging field conventions: `references/logging-fields.md`

## Definition of Done
- A new teammate can answer “what broke?” using the signals and runbook.
- Alerts are actionable (owner + runbook link + mitigation steps).
- Debug logging can be enabled safely (redaction, sampling, and expiry plan).

## Related skills
- `ops-incident-response` and `ops-postmortem` for operational workflows.
- `security-secrets-hygiene` for redaction and configuration discipline.

## Credits
- Influenced by common SRE/observability practices (golden signals, actionable alerts); written as a repo-first, stack-agnostic playbook.
