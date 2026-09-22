"""Tests for JSON-backed statistics persistence."""

import json

from backend.persistence import load_statistics, save_statistics_atomically


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

    save_statistics_atomically(path, statistics)

    assert load_statistics(path) == statistics


def test_invalid_statistics_use_defaults(tmp_path) -> None:
    """Covers validation of invalid JSON statistics."""
    path = tmp_path / "statistics.json"
    invalid_values = [
        {"wins": "three", "losses": 2},
        {"wins": 3},
        {"wins": -1, "losses": 2},
        {"wins": 3, "losses": -1},
    ]

    for values in invalid_values:
        path.write_text(json.dumps(values), encoding="utf-8")

        assert load_statistics(path) == {
            "wins": 0,
            "losses": 0,
        }
