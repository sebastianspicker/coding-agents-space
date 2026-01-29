---
name: security-incident-handling
description: "Security incident handling playbook. Use when responding to suspected security incidents (containment, evidence preservation, credential rotation, communication) in a high-level, non-exploitative way aligned with operations incident response and postmortems."
---

# security-incident-handling (Playbook)

Use this when there is suspected compromise or security exposure. Focus on containment, evidence preservation, and controlled recovery.

## When to use (triggers)
- Suspected credential leak, unauthorized access, or data exposure.
- Alerts indicating suspicious behavior.
- High-risk vulnerability discovered in production systems.

## Inputs / Outputs
- Inputs: incident signals, affected systems/accounts, current access/logging, stakeholder list, legal/privacy constraints.
- Outputs: containment actions + evidence log + rotation plan + communication updates + follow-up actions.

## Step sequence (Triage -> Contain -> Preserve -> Eradicate -> Recover -> Learn)
1) Triage
   - Confirm scope and severity; avoid speculation.
2) Contain
   - Limit blast radius (disable tokens, isolate hosts, block suspicious IPs) in reversible ways.
3) Preserve evidence
   - Capture logs, timestamps, and relevant artifacts; avoid destroying evidence.
4) Eradicate
   - Remove malicious access and patch root cause (or apply compensating controls).
5) Recover
   - Rotate credentials, restore services, and monitor for reoccurrence.
6) Learn
   - Create a postmortem and track actions.

## Credential rotation priority (starter)
- High-privilege API tokens/keys first.
- Session signing keys / auth secrets if exposure is possible.
- Service-to-service credentials.
- User credentials (as needed) with forced resets and comms.

## Templates
- Evidence log: `assets/security-evidence-log.md`
- Communications note: `references/comms-notes.md`

## Definition of Done
- Containment and recovery verified with evidence.
- Credential rotation completed or explicitly scheduled.
- Postmortem and follow-ups tracked.

## Related skills
- `ops-incident-response`, `ops-postmortem`, `security-secrets-hygiene`, `security-audit`.
