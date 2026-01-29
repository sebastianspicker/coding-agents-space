---
name: debian-package-debug
description: "Debian package debugging playbook. Use when apt/dpkg is broken (half-configured packages, dependency conflicts, pinning/held packages) and you need a safe, reproducible recovery workflow with evidence logging."
---

# debian-package-debug (Playbook)

Use this to recover from broken package states without making things worse.

## When to use (triggers)
- `apt` fails with dependency conflicts or broken installs.
- `dpkg` reports half-configured packages.
- Held/pinned packages cause unexpected upgrades/downgrades.

## Inputs / Outputs
- Inputs: error output, recent package changes, OS version, critical services on host.
- Outputs: recovery plan + evidence log + post-fix verification steps.

## Step sequence (Freeze -> Inspect -> Repair -> Verify -> Record)
1) Freeze
   - Avoid repeated random retries; capture errors first.
2) Inspect
   - Identify what’s broken, what’s held/pinned, and what changed recently.
3) Repair
   - Repair dpkg state, resolve dependencies, and restore consistent sources.
4) Verify
   - Verify critical services still function; reboot only if necessary and planned.
5) Record
   - Document what changed and why.

## Templates
- Package incident log: `assets/package-incident-log.md`
- Command snippets: `references/commands.md`

## Definition of Done
- Package manager returns to a clean state (or remaining issues are documented).
- Critical services verified.
- Follow-up plan exists (pinning cleanup, maintenance window, etc.).

