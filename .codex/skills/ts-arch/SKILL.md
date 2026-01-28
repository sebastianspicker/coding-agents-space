# ts-arch (Playbook)

Use this when you need to improve or debug a TS/JS project's architecture: cycles, layering, boundaries, module direction.

## When to use (triggers)
- Circular dependencies cause runtime issues or confusing initialization order.
- Boundaries are unclear and refactors keep getting stuck.
- You need a plan to untangle modules with minimal behavior changes.

## Inputs / Outputs
- Inputs: module layout, entry points, cycle reports (if available), constraints (public API boundaries).
- Outputs: boundary proposal, incremental refactor plan, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: reproduce the architectural symptom (cycle report, runtime init bug, import errors).
2) Diagnose: map the dependency graph at the seam you are changing.
3) Fix: break cycles via dependency inversion, extraction, or moving shared types to a low-level module.
4) Verify: run tests/typecheck; ensure entry points remain stable.

## Notes
- Keep architectural work incremental: avoid "big bang" folder moves.
- Prefer additive APIs and deprecations over breaking changes.

## Definition of Done
- Cycles are reduced (or confined) with a clear rationale.
- Boundaries are documented (even briefly).
- Verification passes and public APIs are unchanged (unless explicitly intended).
