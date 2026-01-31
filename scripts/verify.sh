#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 "$root_dir/scripts/codex/validate_skills.py"

for pkg in "skills/dev-tools/ts-optimize" "skills/dev-tools/ps1-optimize"; do
  echo "==> verify $pkg"
  (
    cd "$root_dir/$pkg"
    npm ci
    npm run build
    npm test
  )
done

