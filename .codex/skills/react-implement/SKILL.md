---
name: react-implement
description: "Playbook for react-implement. Use when implementing or changing React features/components with accessibility, performance, and predictable state management."
---

# react-implement (Playbook)

Use this when implementing React features in a way that’s maintainable, testable, and accessible.

## When to use (triggers)
- Implementing a new React component/feature or fixing a UI bug.
- Performance issues (re-renders, slow lists, expensive computations).
- State management confusion (props drilling, async state, caching).

## Inputs / Outputs
- Inputs: target feature, UI states, data sources, constraints (SSR/CSR), existing patterns in repo.
- Outputs: patch (components + styles + tests if applicable) and verification commands.

## Step sequence (Design -> Implement -> Verify)
1) Design
   - Define states: loading/empty/error/success.
   - Define accessibility and keyboard behavior.
   - Define data boundaries (server vs client; cache vs local state).
2) Implement
   - Prefer simple composition over deep abstractions.
   - Keep components small and focused.
   - Use semantic elements and aria only when needed.
3) Verify
   - Run unit tests and/or E2E tests if present.
   - Check accessibility quickly (labels, focus, keyboard).

## High-signal rules
- Avoid hidden side effects in render.
- Don’t fetch in client components by default if SSR/RSC patterns exist (see Next.js playbook).
- Prefer stable keys for lists; avoid index keys for dynamic lists.
- Fix performance with measurement:
  - identify the actual slow path before memoizing everything.

## Common additions (only if needed)
- Data fetching/caching: prefer the repo’s established pattern (React Query/SWR/etc.) and handle loading/error/empty states explicitly.
- Forms: validation strategy + keyboard/focus behavior.
- Performance: list virtualization for large lists; avoid over-memoization.

## Definition of Done
- UX states and accessibility basics are implemented.
- Performance hotspots are addressed only with evidence.
- Relevant tests/build checks pass.

## Related skills
- `web-playwright-testing` for E2E coverage and UI debugging.
- `next-app-router-workflow` when running React inside Next.js App Router.

## Templates
- Component checklist: `references/component-checklist.md`

## Credits
- Influenced by modern React patterns from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (concepts adapted into a lightweight implementation checklist).
