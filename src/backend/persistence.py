import json
from pathlib import Path

DEFAULT_STATISTICS = {
    'wins': 0,
    'losses': 0,
}

def load_statistics(path: Path) -> dict[str, int]:
    """Load statistics from a JSON file."""
    try:
        with path.open("r", encoding="utf-8") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return DEFAULT_STATISTICS.copy()

    if not isinstance(data, dict):
        return DEFAULT_STATISTICS.copy()
    wins = data.get("wins")
    losses = data.get("losses")

    if (
        not type(data.get("wins")) is not int
        or type(data.get("losses")) is not int
        or data.get("wins") < 0
        or data.get("losses") < 0
    ):
        return DEFAULT_STATISTICS.copy()

    return {
        "wins": data["wins"],
        "losses": data["losses"],
    }

def save_statistics(path: Path, statistics: dict[str, int]) -> None:
    """Save statistics as formatted JSON."""
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8") as file:
        json.dump(statistics, file, indent=2)
        file.write("\n")

