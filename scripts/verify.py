#!/usr/bin/env python3
"""Run the project's quality gate."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SPEC_DIRECTORY = PROJECT_ROOT / "specs" / "terminal"
TEST_DIRECTORY = PROJECT_ROOT / "tests"
STORY_ID_PATTERN = re.compile(r"^(S\d+)[-_ ]", re.IGNORECASE)
STATE_PATTERN = re.compile(
    r"^- \*\*State:\*\* (Modified|Implemented)\s*$",
    re.MULTILINE,
)
ACCEPTANCE_CRITERION_PATTERN = re.compile(
    r"^- \*\*(AK\d+):\**",
    re.MULTILINE | re.IGNORECASE,
)
EXCEPTION_EVIDENCE_PATTERN = re.compile(
    r"^- \*\*(AK\d+) \[(Statisch|Manuell)\]:\*\*\s+(.+?)\s*$",
    re.MULTILINE | re.IGNORECASE,
)
PASSED_EVIDENCE_PATTERN = re.compile(
    r"^`?PASS`?\s*(?:—|-|:)\s+.+$",
    re.IGNORECASE,
)


def print_result(name: str, passed: bool, detail: str = "") -> None:
    """Print one compact quality-gate result."""
    status = "PASS" if passed else "FAIL"
    suffix = f" — {detail}" if detail else ""
    print(f"[{status}] {name}{suffix}")


def run_command(name: str, command: list[str]) -> bool:
    """Run one command from the project root and report its result."""
    print(f"\n== {name} ==")
    completed_process = subprocess.run(
        command,
        cwd=PROJECT_ROOT,
        check=False,
    )
    passed = completed_process.returncode == 0
    print_result(name, passed)
    return passed


def find_story_specs() -> list[Path]:
    """Return all numbered story specifications."""
    return sorted(
        path
        for path in SPEC_DIRECTORY.rglob("*.md")
        if STORY_ID_PATTERN.match(path.name)
    )


def find_test_files() -> list[Path]:
    """Return all pytest files in the test directory."""
    return sorted(TEST_DIRECTORY.rglob("test_*.py"))


def find_exception_evidence(spec_content: str) -> dict[str, str]:
    """Return passed static or manual evidence keyed by criterion."""
    return {
        criterion.upper(): detail.strip()
        for criterion, _evidence_type, detail in EXCEPTION_EVIDENCE_PATTERN.findall(
            spec_content
        )
    }


def evidence_has_passed(detail: str) -> bool:
    """Return whether an exception evidence line records a completed check."""
    return PASSED_EVIDENCE_PATTERN.match(detail) is not None


def check_spec_coverage() -> bool:
    """Check story metadata and acceptance-criterion markers in tests."""
    print("\n== Spec coverage ==")
    story_specs = find_story_specs()

    if not story_specs:
        print_result("Spec coverage", True, "no story specs yet")
        return True

    test_files = find_test_files()
    test_content = "\n".join(
        path.read_text(encoding="utf-8").lower() for path in test_files
    )
    errors: list[str] = []

    for spec_path in story_specs:
        story_match = STORY_ID_PATTERN.match(spec_path.name)
        if story_match is None:
            continue

        story_id = story_match.group(1).upper()
        spec_content = spec_path.read_text(encoding="utf-8")

        if STATE_PATTERN.search(spec_content) is None:
            errors.append(f"{spec_path.name}: valid State is missing")

        acceptance_criteria = {
            criterion.upper()
            for criterion in ACCEPTANCE_CRITERION_PATTERN.findall(spec_content)
        }
        if not acceptance_criteria:
            errors.append(f"{spec_path.name}: no acceptance criteria found")
            continue

        exception_evidence = find_exception_evidence(spec_content)
        unknown_evidence = set(exception_evidence) - acceptance_criteria
        for criterion in sorted(unknown_evidence):
            errors.append(
                f"{spec_path.name}: evidence references unknown {criterion}"
            )

        for criterion in sorted(acceptance_criteria):
            accepted_markers = {
                f"{story_id}-{criterion}".lower(),
                f"{story_id}_{criterion}".lower(),
            }
            if any(marker in test_content for marker in accepted_markers):
                continue

            evidence = exception_evidence.get(criterion)
            if evidence is None:
                errors.append(
                    f"{spec_path.name}: no test marker or static/manual evidence "
                    f"for {story_id}-{criterion}"
                )
            elif not evidence_has_passed(evidence):
                errors.append(
                    f"{spec_path.name}: evidence for {criterion} is not marked PASS"
                )

    if errors:
        for error in errors:
            print(f"  - {error}")
        print_result("Spec coverage", False)
        return False

    print_result("Spec coverage", True)
    return True


def main() -> int:
    """Run all quality-gate steps and return a process exit code."""
    results = [
        run_command(
            "Syntax",
            [sys.executable, "-m", "compileall", "-q", "src", "tests", "scripts"],
        ),
        run_command(
            "Ruff",
            [sys.executable, "-m", "ruff", "check", "src", "tests", "scripts"],
        ),
    ]

    test_files = find_test_files()
    if test_files:
        results.append(
            run_command("Pytest", [sys.executable, "-m", "pytest", "-q"])
        )
    else:
        print("\n== Pytest ==")
        print_result("Pytest", True, "no tests yet")

    results.append(check_spec_coverage())
    passed = all(results)

    print()
    print_result("Quality Gate", passed)
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
