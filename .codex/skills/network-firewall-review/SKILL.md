---
name: network-firewall-review
description: "Network firewall review playbook. Use when reviewing or changing firewall policies: rule hygiene (shadowed rules, any/any), inbound/outbound minimization, logging strategy, change windows, verification via test plans, and an exception lifecycle."
---

# network-firewall-review (Playbook)

Use this to keep firewall policy safe and maintainable: least exposure, reviewable changes, and verification.

## When to use (triggers)
- You’re cleaning up years of firewall rules.
- You need to add a rule for a new service and want to avoid “any/any”.
- You suspect rules are shadowed or redundant.

## Inputs / Outputs
- Inputs: firewall platform, network zones, required flows, current rule set, logging capabilities.
- Outputs: rule review worksheet + change checklist + exception records + verification evidence.

## Step sequence (Inventory -> Review -> Change -> Verify -> Document)
1) Inventory
   - Identify zones, key flows, and policy owners.
2) Review
   - Identify risky patterns and redundancies.
3) Change
   - Implement minimal rule changes with a rollback plan.
4) Verify
   - Verify required flows via test plan; verify logs show expected behavior.
5) Document
   - Record the change and the rationale; track exceptions with expiry.

## Rule hygiene checklist (starter)
- No broad any/any rules unless explicitly justified and bounded.
- Rules are ordered and not shadowed unexpectedly.
- Inbound is default-deny where feasible; outbound documented.
- Logging is enabled for key denies and high-risk allows.

## Templates
- Rule review worksheet: `assets/rule-review-worksheet.md`
- Change checklist: `assets/change-checklist.md`
- Exception record: `assets/exception-record.md`
- Common smells: `references/common-smells.md`

## Definition of Done
- Rules are reviewed and improved with minimal risk.
- Verification executed and recorded.
- Exceptions are tracked with owner/expiry.

## Related skills
- `network-security-baseline` and `network-testing`.

