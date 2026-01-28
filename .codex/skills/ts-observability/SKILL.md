# ts-observability (Playbook)

Use this when you need to add or improve **observability** in TS/JS to make runtime debugging reliable.

## When to use (triggers)
- Bugs are hard to reproduce without better logs/metrics.
- You need traceability across async flows or request boundaries.
- You need to add debug flags without polluting production output.

## Inputs / Outputs
- Inputs: runtime environment, logging conventions, critical flows, privacy/security constraints.
- Outputs: structured logging/tracing changes, minimal overhead, verification evidence.

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro
   - Identify the flow where observability is missing (request, job, CLI command).
2) Diagnose
   - Decide what signal is needed:
     - structured logs (JSON)
     - correlation IDs
     - timing spans
     - error classification
3) Fix
   - Add minimal, structured logs with stable keys.
   - Gate verbose logs behind a debug flag/environment variable.
4) Verify
   - Ensure logs appear for the repro and are not overly noisy.
   - Run tests and confirm no sensitive data is logged.

## Definition of Done
- Observability change makes debugging easier with minimal noise.
- Sensitive data is protected.
- Verification passes.
