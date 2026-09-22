"""Tests for the dataclass persistence learning variant."""

import json

from backend.persistence_v2 import (
    Statistics,
    load_statistics,
    save_statistics_atomically,
)


def test_v2_loads_statistics_as_dataclass(tmp_path) -> None:
    path = tmp_path / "statistics.json"
    path.write_text(json.dumps({"wins": 3, "losses": 2}), encoding="utf-8")

    assert load_statistics(path) == Statistics(wins=3, losses=2)


def test_v2_saves_and_loads_statistics_atomically(tmp_path) -> None:
    path = tmp_path / "nested" / "statistics.json"
    statistics = Statistics(wins=3, losses=2)

    save_statistics_atomically(path, statistics)

    assert load_statistics(path) == statistics


def test_v2_invalid_statistics_use_defaults(tmp_path) -> None:
    path = tmp_path / "statistics.json"
    path.write_text(json.dumps({"wins": -1, "losses": 2}), encoding="utf-8")

    assert load_statistics(path) == Statistics()
