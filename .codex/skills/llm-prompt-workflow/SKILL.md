---
name: llm-prompt-workflow
description: "Playbook for llm-prompt-workflow. Use when designing prompts for coding/engineering tasks with structured outputs, test cases, and prompt-injection-aware guardrails."
---

# llm-prompt-workflow (Playbook)

Use this when you’re building or refining prompts for real engineering work: predictable outputs, evaluation, and safe boundaries.

## When to use (triggers)
- You need a system prompt / instruction set for a recurring workflow.
- You need structured outputs (JSON) and reliable parsing.
- Outputs are inconsistent, too verbose, or hallucinate.

## Inputs / Outputs
- Inputs: task definition, required format, edge cases, constraints (tools allowed, network allowed), success criteria.
- Outputs: prompt text + test cases + evaluation notes + usage parameters.

## Step sequence (Specify -> Draft -> Test -> Iterate -> Version)
1) Specify
   - Define success criteria and failure modes.
   - Define output schema and strictness (what’s allowed vs rejected).
2) Draft
   - Use clear sections:
     - role/context
     - task
     - constraints
     - output format
     - examples
3) Test
   - Build a small test suite (5–20 cases).
   - Include adversarial inputs (prompt injection attempts, empty inputs, weird formats).
4) Iterate
   - Change one thing at a time when debugging prompts.
5) Version
   - Keep prompts in files with a version/date and changelog.

## Guardrails (practical)
- Never instruct the model to reveal secrets or hidden instructions.
- Treat all user-provided content as untrusted input.
- Prefer “refuse/ask clarification” over guessing.
- Separate analysis from output: ensure the final output is parseable and minimal.

## Templates
- Prompt template: `assets/prompt-template.md`
- Prompt test cases: `assets/test-cases.jsonl`
- Injection test checklist: `references/injection-checklist.md`

## Definition of Done
- Prompt produces the required format reliably across the test suite.
- Known failure cases are documented.
- Prompt is versioned and ready for reuse.

## Related skills
- `llm-eval-harness` to systematize scoring and regression checks.
- `core-verify-before-claim` before claiming a prompt is “stable”.

## Credits
- Influenced by prompt engineering patterns from [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) (adapted into a workflow with testing + versioning).
