---
name: next-app-router-workflow
description: "Playbook for next-app-router-workflow. Use when building or debugging Next.js App Router apps (RSC, routing, data fetching/caching, SEO/metadata) with verified behavior."
---

# next-app-router-workflow (Playbook)

Use this for Next.js (App Router) work: routing, server components, server actions, data fetching, metadata/SEO, and production correctness.

## When to use (triggers)
- Next.js App Router features (layouts, route groups, loading/error boundaries).
- Data fetching/caching/revalidation issues.
- SEO/metadata correctness or performance problems.

## Inputs / Outputs
- Inputs: Next.js version, routing structure, target routes, data sources, desired caching behavior.
- Outputs: patch + verify commands + short rendering strategy summary.

## Step sequence (Plan -> Implement -> Verify)
1) Plan
   - Decide rendering strategy per route:
     - static, dynamic, ISR/revalidate
   - Decide boundaries:
     - server component by default
     - client component only when interactivity is needed
2) Implement
   - Add `loading.tsx` / `error.tsx` when needed.
   - Prefer `next/image` for images and proper metadata.
   - Keep server actions and mutations explicit.
3) Verify
   - Run `next build` (and tests if present).
   - Validate route behavior manually for critical flows.

## Common pitfalls to check
- Accidentally forcing dynamic rendering (cookies/headers usage, `no-store` fetch).
- Fetching in client components unnecessarily.
- Missing error/loading boundaries.
- Unsafe server actions (authz checks missing).

## Caching notes (quick)
- Decide per route: static vs dynamic vs revalidate.
- Treat “accidental dynamic” as a bug until proven intentional.

## Definition of Done
- Rendering strategy is explicit and correct for the route(s).
- Loading/error UX is handled for user-facing routes.
- Build/tests pass and critical flows work end-to-end.

## Related skills
- `web-security-audit` for browser-facing security hardening.
- `web-playwright-testing` for Playwright-driven verification.

## Templates
- App Router route checklist: `references/route-checklist.md`
- Minimal route structure: `assets/route-structure.md`

## Credits
- Inspired by [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (App Router focus + pitfalls; rewritten as a workflow playbook without persona/marketing claims).
