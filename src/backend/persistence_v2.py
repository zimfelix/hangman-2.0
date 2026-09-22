"""Learning example: atomically saving statistics as JSON."""

import json
import os
import tempfile
from pathlib import Path


def save_statistics_atomically(
    path: Path,
    statistics: dict[str, int],
) -> None:
    """Write JSON completely, then replace the target file."""
    path.parent.mkdir(parents=True, exist_ok=True)
    file_descriptor, temporary_name = tempfile.mkstemp(
        dir=path.parent,
        prefix=f".{path.name}.",
        suffix=".tmp",
    )

    try:
        with (os.fdopen(file_descriptor, "w", encoding="utf-8") as temporary_file):
            json.dump(statistics, temporary_file, indent=2)
            temporary_file.write("\n")
            temporary_file.flush()
            os.fsync(temporary_file.fileno())

        os.replace(temporary_name, path)
    except BaseException:
        Path(temporary_name).unlink(missing_ok=True)
        raise
