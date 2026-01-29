---
name: it-runbook-documentation
description: "Playbook for it-runbook-documentation. Use when documenting IT processes and server configurations (Linux, Docker, services) as reproducible runbooks in Markdown."
---

# it-runbook-documentation (Playbook)

Use this to document server configurations and IT processes in a way that another engineer can follow without tribal knowledge.

## When to use (triggers)
- You need to document a Linux server, service deployment, or Docker/Compose setup.
- You’re creating operational documentation (backup/restore, upgrades, incident response).
- You need a repeatable checklist for configuration changes.

## Inputs / Outputs
- Inputs: system scope (host/service), environment (prod/staging), existing configs, constraints (secrets handling).
- Outputs: runbook markdown + inventory + verification commands + rollback notes.

## Step sequence (Inventory -> Document -> Verify -> Maintain)
1) Inventory
   - Collect system facts (OS, packages, versions).
   - Identify services, ports, data paths, and dependencies.
2) Document
   - Use the runbook template and fill in only what’s true.
   - Include commands, config file paths, and expected outputs.
3) Verify
   - Validate that a reader can follow the steps in order.
   - Include rollback steps and safety checks.
4) Maintain
   - Update when configs change; keep a changelog section.

## Security rules
- Never include secrets in plaintext.
- Document where secrets live (secret manager, env vars, files with permissions).

## Templates
- Runbook template: `assets/runbook-template.md`
- Server inventory template: `assets/server-inventory.yml`
- Docker Compose notes template: `assets/docker-compose-notes.md`
- systemd unit template: `assets/systemd-unit.service`

## Definition of Done
- Runbook is reproducible (commands + expected outputs).
- Secrets are referenced safely (no plaintext).
- Rollback and troubleshooting steps exist for critical operations.

## Related skills
- `security-audit` for hardening and security documentation.
- `sh-implement` and `py-debug` for operational scripts and troubleshooting (if applicable).

## Credits
- Inspired by ops/reliability playbooks from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (DevOps + SRE structure), adapted into a concrete Markdown runbook template.
