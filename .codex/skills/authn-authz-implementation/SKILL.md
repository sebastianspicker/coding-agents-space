---
name: authn-authz-implementation
description: "Authentication and authorization implementation playbook. Use when implementing AuthN/AuthZ in apps: RBAC/ABAC design, session management, token rotation, auditing, and secure defaults with verifiable tests and threat-model alignment."
---

# authn-authz-implementation (Playbook)

Use this to implement authentication and authorization safely and predictably, with explicit contracts and verification.

## When to use (triggers)
- Implementing login/session/token flows.
- Designing authorization (RBAC/ABAC) for APIs and UIs.
- Rotating tokens/keys or changing permission models.

## Inputs / Outputs
- Inputs: user roles, protected resources/actions, identity provider constraints, audit requirements, threat model.
- Outputs: auth design doc + RBAC/ABAC matrix + rotation runbook + tests and verification evidence.

## Step sequence (Model -> Implement -> Test -> Audit -> Operate)
1) Model
   - Define roles, resources, actions, and default-deny rules.
2) Implement
   - Implement AuthN and AuthZ boundaries; avoid “optional checks” scattered in code.
3) Test
   - Add tests for:
     - allow/deny matrix
     - session/token expiry and refresh behavior
     - privilege escalation attempts
4) Audit
   - Add audit logging for security-sensitive actions.
5) Operate
   - Define rotation and incident response procedures.

## Templates
- Auth design doc: `assets/auth-design-doc.md`
- RBAC/ABAC matrix: `assets/rbac-matrix.md`
- Token rotation runbook: `assets/token-rotation-runbook.md`
- Checklist: `references/checklist.md`

## Definition of Done
- Authorization policy is explicit and default-deny.
- Tests cover key access paths and regression scenarios.
- Audit logging and rotation procedures are documented.

## Related skills
- `threat-modeling`, `secure-implement`, `security-audit`, `reverse-proxy-auth`.

