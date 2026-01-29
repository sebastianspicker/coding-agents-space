---
name: local-llm-evals-prod
description: "Production LLM evaluation playbook. Use when running online evals for local/self-hosted LLMs: sampling strategy, drift detection, safety regression suites, prompt/model rollouts (canary), model-degraded incident workflow, and privacy-aware telemetry."
---

# local-llm-evals-prod (Playbook)

Use this to keep LLM quality stable in production: detect regressions, measure drift, and roll out changes safely.

## When to use (triggers)
- You’re changing model weights, prompt templates, retrieval behavior, or tool policies.
- You need confidence beyond offline evals (real traffic differs).
- You want to detect “silent” quality degradation over time.

## Inputs / Outputs
- Inputs: production traffic characteristics, privacy constraints, eval criteria, baseline model/prompt versions, rollback ability.
- Outputs: eval policy + regression suite manifest + rollout checklist + incident log template for model degradation.

## Step sequence (Policy -> Instrument -> Regress -> Drift -> Rollout -> Respond)
1) Policy (sampling + privacy)
   - Define what is sampled, how it’s sanitized, and retention rules.
2) Instrument
   - Record:
     - model/prompt/rag version identifiers
     - outcome signals (explicit ratings, implicit proxies)
     - safety events (refusals, blocked tool calls)
3) Regressions
   - Maintain a fixed regression suite (golden cases + adversarial safety cases).
4) Drift detection
   - Track changes in:
     - input distribution (topics, lengths)
     - output distribution (refusal rates, length, toxicity signals if used)
     - key quality metrics
5) Rollout
   - Canary changes; compare to baseline; roll back on defined triggers.
6) Respond
   - Use an incident workflow when quality degrades (mitigate, communicate, follow up).

## Practical rules
- Prefer evaluating *outcomes* and *groundedness* (when RAG) over exact text matches.
- Keep evals privacy-safe: minimize raw prompt retention; hash identifiers; store only what’s needed.
- Treat safety as a first-class regression axis, not an afterthought.

## Templates
- Eval policy: `assets/eval-policy.md`
- Regression suite manifest: `assets/regression-suite-manifest.md`
- Rollout/rollback checklist: `assets/rollout-checklist.md`
- Model quality incident log: `assets/model-quality-incident-log.md`
- Privacy notes: `references/privacy.md`

## Definition of Done
- Eval policy exists and is implemented with privacy constraints.
- Regression suite runs on every relevant change.
- Drift monitoring and rollback triggers are defined and tested.

## Related skills
- `local-llm-ops`, `llm-eval-harness`, `rag-workflow`, `prompt-injection-defense`.
- `ops-incident-response` and `ops-postmortem` for ops discipline.

