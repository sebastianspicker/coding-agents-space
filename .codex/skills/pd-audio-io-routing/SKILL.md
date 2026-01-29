---
name: pd-audio-io-routing
description: "Pd audio I/O routing playbook. Use when configuring Pure Data audio routing across ALSA/CoreAudio/JACK, choosing devices, tuning latency, avoiding feedback, and documenting multi-channel setups with a routing diagram and config log."
---

# pd-audio-io-routing (Playbook)

Use this to set up and debug audio routing for Pd in labs and performances, especially where devices differ across students.

## When to use (triggers)
- Pd has no audio, distorted audio, or wrong channels.
- Latency is too high or unstable.
- Switching between ALSA/CoreAudio/JACK or between devices/interfaces.
- Multi-channel routing (stereo, quad, 8ch) needs documentation.

## Inputs / Outputs
- Inputs: OS, audio backend, device/interface, desired routing (in/out channels), target latency budget.
- Outputs: routing diagram + config log + verification checklist.

## Step sequence (Inventory -> Configure -> Verify -> Tune -> Record)
1) Inventory
   - Identify hardware devices and channel counts.
2) Configure
   - Choose backend (ALSA/CoreAudio/JACK) and set sample rate/buffer sizes.
3) Verify
   - Verify: input monitoring, output routing, and channel mapping.
4) Tune
   - Tune latency by adjusting buffer size and ensuring the system can sustain it.
5) Record
   - Record configuration and known-good settings.

## Safety notes
- Feedback avoidance: start quiet; confirm signal path before raising level.
- Multi-device setups: be explicit about which device is the clock master.

## Templates
- Routing diagram: `assets/routing-diagram.md`
- Config log: `assets/config-log.md`
- Latency tuning checklist: `references/latency.md`

## Definition of Done
- A known-good Pd audio configuration is documented.
- Channel mapping is verified and repeatable.
- Latency is within target or limitations are documented.

