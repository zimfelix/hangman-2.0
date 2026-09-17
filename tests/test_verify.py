"""Tests for the project quality-gate helpers."""

from scripts.verify import evidence_has_passed, find_exception_evidence


def test_find_exception_evidence_reads_static_and_manual_checks() -> None:
    """Read both supported non-automated evidence types."""
    spec_content = """
- **AK2 [Statisch]:** `PASS` — build completed
- **AK3 [Manuell]:** PASS: booking appeared in the calendar
"""

    assert find_exception_evidence(spec_content) == {
        "AK2": "`PASS` — build completed",
        "AK3": "PASS: booking appeared in the calendar",
    }


def test_evidence_has_passed_rejects_open_checks() -> None:
    """Do not accept a planned check as completed evidence."""
    assert evidence_has_passed("`PASS` — page opened successfully")
    assert not evidence_has_passed("OPEN — page still needs a manual check")
