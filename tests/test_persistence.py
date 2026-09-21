"""Tests for JSON-backed statistics persistence."""

from backend.persistence import load_statistics, save_statistics


def test_missing_statistics_start_empty(tmp_path) -> None:
    """Covers: S004-AK1, S004-AK4."""
    assert load_statistics(tmp_path / "statistics.json") == {
        "wins": 0,
        "losses": 0,
    }


def test_statistics_are_saved_and_loaded(tmp_path) -> None:
    """Covers: S004-AK2."""
    path = tmp_path / "nested" / "statistics.json"
    statistics = {"wins": 3, "losses": 2}

    save_statistics(path, statistics)

    assert load_statistics(path) == statistics
