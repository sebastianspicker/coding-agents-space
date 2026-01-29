---
name: ops-postmortem
description: "Operations postmortem playbook. Use after incidents to write a blameless postmortem with root cause, contributing factors, and tracked action items."
---

# ops-postmortem (Playbook)

Use this after the incident is mitigated to prevent recurrence.

## When to use (triggers)
- After a SEV1–SEV3 incident.
- After a near-miss with meaningful risk.

## Inputs / Outputs
- Inputs: incident log, timeline, mitigation steps, evidence, stakeholders.
- Outputs: postmortem doc + action items with owners and due dates.

## Step sequence (Collect -> Analyze -> Write -> Review -> Track)
1) Collect
   - Gather timelines and evidence while fresh.
2) Analyze
   - Identify root cause and contributing factors.
   - Separate “trigger” from “latent conditions”.
3) Write
   - Use the template; keep it factual and blameless.
4) Review
   - Confirm accuracy with responders and relevant stakeholders.
5) Track
   - Convert action items into tickets with owners/dates.

## Action item rules
- Each item must be:
  - specific
  - owned
  - time-bounded
  - verifiable

## Templates
- Postmortem template: `assets/postmortem-template.md`

## Definition of Done
- Root cause is clear and supported by evidence.
- Action items are tracked and prioritized.
- Lessons learned are documented and shared.
