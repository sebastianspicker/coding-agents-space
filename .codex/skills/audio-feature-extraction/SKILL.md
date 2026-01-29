---
name: audio-feature-extraction
description: "Audio feature extraction playbook. Use when extracting features from audio (STFT/melspectrogram, onset detection, pitch tracking, loudness/LUFS) with dataset hygiene, a feature registry, and an audio-specific dataset card."
---

# audio-feature-extraction (Playbook)

Use this to extract audio features reproducibly and safely, with clear provenance and minimal leakage.

## When to use (triggers)
- Building datasets for MIR tasks (classification, onset detection, transcription baselines).
- Teaching signal processing features (spectrograms, pitch, loudness).
- You need a registry of features and versioned extraction settings.

## Inputs / Outputs
- Inputs: audio corpus, labeling scheme, sample rate policy, privacy/licensing constraints.
- Outputs: audio dataset card + feature registry + extraction configuration and artifacts.

## Step sequence (Define -> Normalize -> Extract -> Validate -> Version)
1) Define
   - Define tasks and labels; decide feature set and rationale.
2) Normalize
   - Define sample rate/channel policy; document resampling.
3) Extract
   - Extract features with recorded windowing/hop settings.
4) Validate
   - Sanity checks on a sample: spectrogram shapes, pitch plausibility, loudness ranges.
5) Version
   - Version feature definitions and extraction config to avoid silent drift.

## Dataset hygiene rules
- Keep raw audio immutable; write derived features separately.
- Record licensing constraints and usage permissions.
- Prevent leakage: ensure splits don’t share near-duplicate segments.

## Templates
- Feature registry: `assets/feature-registry.md`
- Audio dataset card: `assets/audio-dataset-card.md`
- Quality checklist: `references/quality.md`

## Definition of Done
- Feature extraction config is recorded and reproducible.
- Dataset card documents provenance, splits, and licensing.
- Sanity checks pass on representative examples.

