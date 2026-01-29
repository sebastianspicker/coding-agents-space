---
name: waf-basics
description: "Web application firewall basics playbook. Use when deploying WAF controls at a high level: goals/limits, staged rollout (monitor→block), rate limits vs WAF rules, bot mitigation basics, logging, exception workflow, and change management."
---

# waf-basics (Playbook)

Use this to adopt WAF controls responsibly: avoid false positives, stage changes, and keep exceptions tracked.

## When to use (triggers)
- Introducing a WAF in front of an app (cloud WAF, reverse proxy WAF module, etc.).
- You need a policy for “monitor mode” to “block mode”.
- You want a structured exception workflow for false positives.

## Inputs / Outputs
- Inputs: protected apps/routes, traffic profile, threat model, acceptable false-positive rate, logging/monitoring stack.
- Outputs: WAF policy + exception workflow + rollout checklist + verification evidence.

## Step sequence (Scope -> Policy -> Stage -> Observe -> Enforce -> Review)
1) Scope
   - Decide what is protected (hosts/routes) and what remains unprotected (if any).
2) Policy
   - Define rule sets, rate limits, and bot mitigations at a high level.
3) Stage
   - Start in monitor-only mode; collect logs and baseline false positives.
4) Observe
   - Triage top triggers and tune rules with an exception process.
5) Enforce
   - Move to block mode gradually; keep rollback plan.
6) Review
   - Review exceptions and rule changes regularly.

## Key principles
- A WAF complements secure implementation; it does not replace it.
- Treat false positives as a product/availability risk; stage changes.
- Prefer targeted rules over broad “block everything suspicious” defaults.

## Templates
- WAF policy: `assets/waf-policy.md`
- Exception template: `assets/exception-template.md`
- Rollout checklist: `assets/rollout-checklist.md`
- Metrics guidance: `references/metrics.md`

## Definition of Done
- WAF policy exists and is applied to a defined scope.
- Monitor mode baseline collected and tuned.
- Block mode rollout performed safely with rollback plan.

## Related skills
- `web-security-audit` and `secure-implement`.
- `reverse-proxy-auth` for auth-layer concerns at the edge.

