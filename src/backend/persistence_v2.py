"""Learning example: dataclass JSON persistence with an atomic save."""

import json
import os
import tempfile
from dataclasses import asdict, dataclass
from pathlib import Path


@dataclass
class Statistics:
    """Structured representation of game statistics."""

    wins: int = 0
    losses: int = 0


def load_statistics(path: Path) -> Statistics:
    """Load validated statistics into a Statistics object."""
    try:
        with path.open("r", encoding="utf-8") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return Statistics()

    if not isinstance(data, dict):
        return Statistics()

    wins = data.get("wins")
    losses = data.get("losses")
    if (
        type(wins) is not int
        or type(losses) is not int
        or wins < 0
        or losses < 0
    ):
        return Statistics()

    return Statistics(wins=wins, losses=losses)


def save_statistics_atomically(
    path: Path,
    statistics: Statistics,
) -> None:
    """Write statistics completely, then replace the target file."""
    path.parent.mkdir(parents=True, exist_ok=True)
    file_descriptor, temporary_name = tempfile.mkstemp(
        dir=path.parent,
        prefix=f".{path.name}.",
        suffix=".tmp",
    )

    try:
        with os.fdopen(
            file_descriptor,
            "w",
            encoding="utf-8",
        ) as temporary_file:
            json.dump(asdict(statistics), temporary_file, indent=2)
            temporary_file.write("\n")
            temporary_file.flush()
            os.fsync(temporary_file.fileno())

        os.replace(temporary_name, path)
    except BaseException:
        Path(temporary_name).unlink(missing_ok=True)
        raise
