---
name: debian-kernel-boot-recovery
description: "Debian kernel/boot recovery playbook. Use for break-glass recovery when a Debian host fails to boot: GRUB and initramfs recovery, disk UUID/fsck considerations, kernel rollback, remote safety, and post-boot verification with a change log."
---

# debian-kernel-boot-recovery (Playbook)

Use this when a Debian system is unbootable or unstable after kernel/initramfs changes. It prioritizes safe recovery and evidence capture, not speed at any cost.

## When to use (triggers)
- Host fails to boot after upgrades or config changes.
- Kernel panics, cannot mount root, or drops to initramfs shell.
- Bootloader/GRUB misconfiguration or wrong root UUID.

## Inputs / Outputs
- Inputs: physical/virtual access method, last known good kernel, disk layout, encryption/LVM details, remote access constraints.
- Outputs: recovery runbook execution log + “what changed” record + post-boot verification evidence.

## Step sequence (Stabilize -> Access -> Diagnose -> Recover -> Verify -> Record)
1) Stabilize
   - Decide whether to proceed immediately or schedule a window (production impact).
2) Access
   - Ensure you have console access (IPMI/KVM/VM console).
3) Diagnose
   - Identify failure domain: GRUB entry, initramfs, root device, filesystem.
4) Recover
   - Prefer conservative recovery:
     - boot last known good kernel
     - rebuild initramfs
     - fix GRUB config
     - run fsck where appropriate (with caution)
5) Verify
   - Verify networking, critical services, and logs post-boot.
6) Record
   - Record what changed and follow-ups to prevent recurrence.

## Safety principles
- Avoid destructive filesystem operations without backups or explicit acceptance.
- Keep an audit trail: what you tried, what worked, and why.
- Don’t assume success until services and logs confirm stability.

## Templates
- Recovery runbook: `assets/recovery-runbook.md`
- What changed log: `assets/what-changed-log.md`
- Post-boot verification checklist: `assets/post-boot-verification.md`
- Common scenarios: `references/common-scenarios.md`

## Definition of Done
- System boots reliably into the intended configuration (or is rolled back).
- Critical services verified and evidence recorded.
- Follow-up actions filed (pin kernel, adjust update policy, add monitoring).

## Related skills
- `debian-package-debug` for broken upgrades/packaging issues.
- `pve-basics-ops` / `k8s-cluster-maintenance` for platform-level maintenance planning.

