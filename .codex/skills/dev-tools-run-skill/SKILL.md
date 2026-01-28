# dev-tools-run-skill (Playbook)

Use this when you need to run the repo's **runtime skills** (`skills/dev-tools/*`) in a predictable way (Docker sandbox / local build),
and produce a reproducible JSON run result.

## When to use (triggers)
- You want to run `ts-optimize` or `ps1-optimize` against a target project.
- You need to craft/adjust input JSON (`project`, `actions`, `targets`) and interpret output (`findings`, `patches`, `metrics`).
- You want patch-first output and a safe “apply later” workflow.

## Inputs / Outputs
- Inputs: target project absolute path on your machine, desired actions, optional scope (`targets.paths`, include/exclude globs).
- Outputs: JSON `RunResult` (success/error + findings + patches + metrics + logs).

## Step sequence (Repro -> Diagnose -> Fix -> Verify)
1) Repro: pick a minimal input JSON that reproduces the need (single action first).
2) Diagnose: run patch-only, inspect `data.findings` + `data.logs`.
3) Fix: re-run with `applyFixes=true` only after you agree with the patch intent.
4) Verify: run the target project's checks + re-run the same skill input to confirm clean output.

## How to run (Docker sandbox - recommended)
The sandbox expects the target project mounted at `/workspace`, and `project.root` must be `/workspace` (or under it).

### ts-optimize
Build:
```bash
cd skills/dev-tools/ts-optimize
docker build -t ts-optimize-skill -f sandbox/Dockerfile .
```

Run:
```bash
cat examples/input.quick.json | docker run --rm -i \
  -v "/ABSOLUTE/PATH/TO/YOUR/TS/PROJECT":/workspace \
  ts-optimize-skill
```

### ps1-optimize
Build:
```bash
cd skills/dev-tools/ps1-optimize
docker build -t ps1-optimize-skill -f sandbox/Dockerfile .
```

Run:
```bash
cat examples/input.quick.json | docker run --rm -i \
  -v "/ABSOLUTE/PATH/TO/YOUR/PS/PROJECT":/workspace \
  ps1-optimize-skill
```

## How to run (local build - alternative)
Useful for quick iteration when Docker is inconvenient.

### ts-optimize
```bash
cd skills/dev-tools/ts-optimize
npm install
npm run build
node dist/index.js < examples/input.quick.json
```

### ps1-optimize
```bash
cd skills/dev-tools/ps1-optimize
npm install
npm run build
node dist/index.js < examples/input.quick.json
```

## Input authoring essentials (do this first)
- Start from `skills/dev-tools/*/examples/input.*.json`.
- `project.root` must be `/workspace` (Docker) or a path under `/workspace` (still Docker).
- `actions` is max 20 items.
- `targets.changedOnly` exists in schema but is currently ignored; use `targets.paths` instead.

## Verification (this repo)
- `cd skills/dev-tools/ts-optimize && npm install && npm run build && npm test`
- `cd skills/dev-tools/ps1-optimize && npm install && npm run build && npm test`

## Definition of Done
- You can run the skill from a clean state with a single command and get deterministic JSON output.
- Scope is explicit (paths/globs) and small enough to review.
- Any “applyFixes” run is intentional and followed by verification.
