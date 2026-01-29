---
name: web-playwright-testing
description: "Playbook for web-playwright-testing. Use when testing or debugging web apps via Playwright (E2E, UI behavior, flaky tests) with a recon-then-action workflow."
---

# web-playwright-testing (Playbook)

Use this for local/E2E web testing and UI debugging using Playwright patterns.

## When to use (triggers)
- You need to validate UI behavior end-to-end.
- You’re debugging a regression, flaky UI test, or selector issues.
- You need evidence (screenshots, traces, console logs) to isolate a bug.

## Inputs / Outputs
- Inputs: app start command(s), base URL(s), target flow, expected result, CI constraints.
- Outputs: a deterministic test script or Playwright test, plus verification commands and artifacts.

## Step sequence (Recon -> Action -> Stabilize -> Verify)
1) Recon
   - Start the app the same way CI does (or document the local equivalent).
   - Collect evidence:
     - screenshots
     - console logs
     - network failures
2) Action
   - Implement the user flow using stable selectors (role/name first).
3) Stabilize
   - Remove arbitrary sleeps; use proper waits and assertions.
   - Make test independent; no shared state between tests.
4) Verify
   - Run the test locally.
   - If CI exists, run the same job command locally if possible.

## Selector rules
- Prefer `getByRole` / role-based selectors.
- Prefer accessible names and test ids over CSS classes.
- Avoid `nth()` unless no alternative exists.

## Artifacts
Capture at least one:
- screenshot of failure state
- trace (if configured)
- console output excerpt (sanitized)

## Flake triage (practical)
- Confirm the test fails for a real reason (not race/timeout).
- Replace sleeps with conditions:
  - wait for a UI state, not a timer
  - assert on “ready” signals
- Capture artifacts on failure (screenshot + trace when available).

## Auth and state
- Prefer test users and deterministic data fixtures.
- Don’t share state across tests; create what you need inside the test or via setup hooks.

## Definition of Done
- Test/script is deterministic (no arbitrary sleeps).
- Selectors are stable and aligned with accessibility when possible.
- Evidence artifacts exist for failures and debugging.

## Related skills
- `core-verify-before-claim` before claiming “tests pass”.
- `repo-run-commands` to mirror CI’s correct commands.

## Templates
- Playwright recon checklist: `references/recon-checklist.md`
- Minimal test plan: `assets/test-plan.md`

## Credits
- Inspired by [anthropics/skills](https://github.com/anthropics/skills) (webapp-testing patterns) and [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (Playwright stability guidance), rewritten for repo-local, provider-agnostic usage.
