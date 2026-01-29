---
name: pve-vm-templates-cloud-init
description: "Proxmox VE VM template and cloud-init playbook. Use when creating golden images/templates, configuring cloud-init user-data, managing SSH keys, and enforcing deterministic provisioning and update strategy."
---

# pve-vm-templates-cloud-init (Playbook)

Use this to produce consistent VMs via templates and cloud-init, reducing drift and “snowflake VM” issues.

## When to use (triggers)
- Creating new VM templates or standardizing builds.
- Automating provisioning with cloud-init.
- Rotating SSH keys or changing base image hardening.

## Inputs / Outputs
- Inputs: OS base (Debian/Ubuntu), required packages/config, SSH key policy, update strategy, networking conventions.
- Outputs: template checklist + cloud-init snippet + documented provisioning steps.

## Step sequence (Design -> Build -> Harden -> Snapshot -> Provision -> Verify)
1) Design
   - Define what is baked into the template vs configured via cloud-init.
2) Build
   - Install base OS and required baseline packages.
3) Harden
   - Apply minimal security baseline (users/ssh/updates).
4) Snapshot
   - Convert to template; version it.
5) Provision
   - Use cloud-init user-data/meta-data; keep it deterministic and reviewed.
6) Verify
   - Provision a test VM and validate baseline behavior.

## Templates
- Template checklist: `assets/template-checklist.md`
- Cloud-init user-data snippet: `assets/cloud-init-user-data.yml`
- Versioning notes: `references/versioning.md`

## Definition of Done
- Template is versioned and documented.
- Provisioning is repeatable from cloud-init without manual steps.
- A test VM was created and verified.

