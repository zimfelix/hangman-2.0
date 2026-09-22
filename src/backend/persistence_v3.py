"""Learning example: JSON persistence with a dataclass model."""

import json
from dataclasses import asdict, dataclass
from pathlib import Path


@dataclass
class Statistics:
    """Structured representation of game statistics."""

    wins: int = 0
    losses: int = 0


def load_statistics(path: Path) -> Statistics:
    """Load statistics into a Statistics object."""
    try:
        with path.open("r", encoding="utf-8") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return Statistics()

    if (
        not isinstance(data, dict)
        or type(data.get("wins")) is not int
        or type(data.get("losses")) is not int
        or data["wins"] < 0
        or data["losses"] < 0
    ):
        return Statistics()

    return Statistics(wins=data["wins"], losses=data["losses"])


def save_statistics(path: Path, statistics: Statistics) -> None:
    """Save a Statistics object as JSON."""
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8") as file:
        json.dump(asdict(statistics), file, indent=2)
        file.write("\n")
