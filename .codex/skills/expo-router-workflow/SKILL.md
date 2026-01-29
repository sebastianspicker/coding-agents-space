---
name: expo-router-workflow
description: "Playbook for expo-router-workflow. Use when building or debugging Expo + Expo Router apps (routing, native/web differences, builds, and safe data fetching) with verified behavior."
---

# expo-router-workflow (Playbook)

Use this for Expo Router navigation, platform differences, and reliable feature implementation in Expo apps.

## When to use (triggers)
- Adding routes/screens, deep links, tabs/stacks, auth flows.
- Debugging native-vs-web differences.
- Build/runtime issues related to Expo config or environment.

## Inputs / Outputs
- Inputs: Expo SDK version, routing layout, target platform(s), build type (dev client/EAS), data sources.
- Outputs: patch + verify steps (local run + targeted flows).

## Step sequence (Plan -> Implement -> Verify)
1) Plan
   - Decide navigation structure (tabs/stacks/groups).
   - Identify platform-specific behavior and edge cases.
2) Implement
   - Keep route files small and focused.
   - Avoid platform-specific hacks unless required; isolate them when needed.
   - Use safe data-fetching patterns (timeouts, retries, error UI).
3) Verify
   - Run on at least one iOS and one Android target (simulator is ok early; real device for risky changes).
   - Verify critical navigation flows end-to-end.

## Common pitfalls
- Route file naming and path conflicts.
- State reset on navigation and back behavior differences.
- Permissions and platform APIs not available on web.

## Builds and updates (when relevant)
- Record the exact build/update path used (dev client vs store build vs OTA update).
- Prefer a short “repro checklist” entry for build-only issues (device, SDK, config, env).

## Definition of Done
- Navigation flows work on target platforms.
- Platform-specific behavior is isolated and documented.
- Verification steps are recorded and reproducible.

## Related skills
- `core-debug-root-cause` for hard-to-reproduce issues.
- `it-runbook-documentation` to document build/deploy procedures.

## Templates
- Navigation flow checklist: `references/navigation-checklist.md`
- Runbook for reproducing bugs: `assets/repro-template.md`

## Credits
- Inspired by Expo/React Native patterns from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (navigation + platform pitfalls; rewritten as a Codex playbook).
