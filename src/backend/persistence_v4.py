"""Learning example: JSON persistence behind a repository class."""

import json
from pathlib import Path


class StatisticsRepository:
    """Load and save statistics at one configured path."""

    def __init__(self, path: Path) -> None:
        self.path = path

    def load(self) -> dict[str, int]:
        """Load statistics or return empty defaults."""
        try:
            with self.path.open("r", encoding="utf-8") as file:
                data = json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            return {"wins": 0, "losses": 0}

        if (
            not isinstance(data, dict)
            or type(data.get("wins")) is not int
            or type(data.get("losses")) is not int
            or data["wins"] < 0
            or data["losses"] < 0
        ):
            return {"wins": 0, "losses": 0}

        return {"wins": data["wins"], "losses": data["losses"]}

    def save(self, statistics: dict[str, int]) -> None:
        """Save statistics to the configured path."""
        self.path.parent.mkdir(parents=True, exist_ok=True)

        with self.path.open("w", encoding="utf-8") as file:
            json.dump(statistics, file, indent=2)
            file.write("\n")
