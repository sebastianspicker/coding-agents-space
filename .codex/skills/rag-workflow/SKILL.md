---
name: rag-workflow
description: "RAG workflow playbook. Use when building or improving retrieval-augmented generation: ingestion/chunking/metadata, indexing, retrieval evaluation, answer grounding, and regression tests to reduce hallucinations."
---

# rag-workflow (Playbook)

Use this to build RAG systems that are *measurable*: retrieval quality, answer grounding, and regressions are tracked over time.

## When to use (triggers)
- You’re adding RAG to a product (docs Q&A, support, internal knowledge).
- Answers are ungrounded or inconsistent.
- Retrieval seems irrelevant (wrong chunks, missing citations, stale docs).
- You need an eval set and regression harness.

## Inputs / Outputs
- Inputs: document corpus, access rules (PII/secrets), retrieval constraints (latency/cost), desired answer style (citations required?).
- Outputs: ingestion/chunking plan + metadata schema + retrieval strategy + eval set + regression checks.

## Step sequence (Define -> Ingest -> Retrieve -> Answer -> Evaluate -> Harden)
1) Define
   - Write the task definition:
     - what questions are in-scope
     - what sources are allowed
     - what “grounded” means (citations, quotes, or doc IDs)
   - Decide the answer contract (format + refusal rules).
2) Ingest
   - Normalize docs (strip boilerplate, stable IDs, timestamps).
   - Chunk with intent:
     - chunk by headings/sections when possible
     - keep chunks small enough for retrieval, large enough for context
   - Attach metadata (source, path/url, section heading, updated_at, ACL tags).
3) Retrieve
   - Choose retrieval baseline (dense, sparse, hybrid).
   - Add filters (ACL, recency, product area).
   - Add reranking only if baseline is insufficient.
4) Answer
   - Require citations to retrieved context (doc IDs/paths).
   - Never invent sources; if not found, say so and ask for missing info.
   - Add “uncertainty” rules for ambiguous questions.
5) Evaluate
   - Build an eval set with expected sources (not just expected text).
   - Track:
     - retrieval recall@k (did we fetch the right docs?)
     - answer groundedness (did it cite retrieved context?)
     - refusal/abstention quality
6) Harden
   - Add prompt-injection filters and “source allowlist” constraints.
   - Add regression tests for known failures (stale docs, wrong citations, jailbreaks).

## Design rules that reduce hallucinations
- Prefer “source-first” answers:
  - cite doc IDs/paths for key claims
  - keep answers conditional when evidence is partial
- Separate facts from inferences:
  - facts: directly supported by retrieved text
  - inferences: explicitly labeled as assumptions/guesses
- Use a small, consistent output schema.

## Templates
- Answer contract template: `assets/answer-contract.md`
- Metadata schema (starter): `assets/metadata-schema.json`
- Eval case template: `assets/eval-case.yaml`
- Retrieval eval worksheet: `references/retrieval-eval.md`

## Definition of Done
- Ingestion produces stable doc IDs and required metadata.
- Retrieval quality is measured (at least recall@k on an eval set).
- Answer output enforces grounding (citations) and abstains when evidence is missing.
- Regression harness exists for top failure modes.

## Related skills
- `llm-prompt-workflow` and `llm-eval-harness` for structured prompting and evaluation discipline.
- `security-secrets-hygiene` for corpus sanitization rules.

## Credits
- Influenced by common RAG evaluation patterns (retrieval recall + groundedness + regressions); written as a provider-agnostic workflow.

