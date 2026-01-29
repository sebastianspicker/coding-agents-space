---
name: phyphox-lab-workflow
description: "phyphox lab workflow playbook. Use when designing smartphone-based physics/astronomy labs: measurement design, calibration, export/parsing, cleaning, uncertainty handling, and privacy/ethics notes for student data."
---

# phyphox-lab-workflow (Playbook)

Use this to design labs that are robust to noisy classroom conditions and produce defensible results and documentation.

## When to use (triggers)
- Designing labs using phyphox (accelerometer, magnetometer, sound, light).
- Running classroom measurements with heterogeneous devices.
- Creating student-facing instructions and data handling notes.

## Inputs / Outputs
- Inputs: learning goal, sensor(s), device constraints, environment constraints, data export format, privacy constraints.
- Outputs: lab sheet + calibration protocol + data handling note + analysis outline.

## Step sequence (Design -> Calibrate -> Measure -> Export -> Analyze -> Reflect)
1) Design
   - Define the physical quantity and how sensor readings map to it.
2) Calibrate
   - Provide a calibration protocol and how to record calibration constants.
3) Measure
   - Define repeatable measurement steps and controls.
4) Export
   - Define export format and naming conventions.
5) Analyze
   - Provide a robust analysis workflow and uncertainty handling.
6) Reflect
   - Connect results back to learning goals; discuss limitations and device variability.

## Privacy/ethics rules (classroom)
- Don’t collect personal identifiers unless required.
- Avoid collecting location/audio unless explicitly justified and consented.
- Document retention and sharing policy.

## Templates
- Lab sheet: `assets/lab-sheet.md`
- Calibration protocol: `assets/calibration-protocol.md`
- Data handling note: `assets/data-handling-note.md`

## Definition of Done
- Students can run the lab with minimal ambiguity.
- Calibration and uncertainty handling are documented.
- Data privacy and retention policy is explicit.

## Related skills
- `classroom-data-analysis-python` for analysis and report generation.
- `teaching-simulation-design` for conceptual framing.

