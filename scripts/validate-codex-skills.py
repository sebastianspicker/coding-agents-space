#!/usr/bin/env python3

"""
Compatibility shim.

New canonical path:
  scripts/codex/validate_skills.py
"""

from __future__ import annotations

from pathlib import Path
import runpy


def main() -> None:
    target = Path(__file__).parent / "codex" / "validate_skills.py"
    runpy.run_path(str(target), run_name="__main__")


if __name__ == "__main__":
    main()
