---
name: llm-eval-harness
description: "Playbook for llm-eval-harness. Use when creating an evaluation harness for AI features (prompts/RAG/tools) with fixtures, scoring, and regression checks."
---

# llm-eval-harness (Playbook)

Use this when you need to move from “seems better” to “measurably better”.

## When to use (triggers)
- You’re iterating on prompts, structured outputs, or RAG retrieval quality.
- You need to prevent regressions across model/prompt changes.
- You need reproducible evaluation artifacts (fixtures, scores, baselines).

## Inputs / Outputs
- Inputs: task definition, evaluation criteria, representative inputs, failure modes.
- Outputs: eval dataset (fixtures), scoring rubric, baseline results, and a repeatable run procedure.

## Step sequence (Define -> Build fixtures -> Score -> Baseline -> Regress)
1) Define
   - Pick metrics that match the task:
     - correctness, format validity, refusal correctness, latency/cost proxies
2) Build fixtures
   - Collect 20–200 representative cases.
   - Include edge cases and adversarial inputs.
3) Score
   - Use a rubric with discrete grades (pass/fail or 1–5).
   - Separate “format validity” from “content correctness”.
4) Baseline
   - Run the current prompt/model and record results.
5) Regress
   - On each change: re-run and compare to baseline.

## Practical scoring rubric (starter)
- Format:
  - valid JSON, schema-conformant, no extra fields (if strict)
- Safety:
  - refuses disallowed actions; no secret leakage
- Correctness:
  - answers match expected constraints and content

## Templates
- Eval plan: `assets/eval-plan.md`
- Fixture schema: `assets/fixtures.jsonl`
- Scoring sheet: `assets/scores.csv`

## Definition of Done
- Fixtures cover the task realistically (not toy cases only).
- A baseline is recorded and re-runs are comparable.
- Changes are evaluated with the same rubric and recorded.

## Related skills
- `llm-prompt-workflow` to improve prompts with test cases.
- `core-verify-before-claim` before claiming an improvement.
