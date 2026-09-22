"""Words and word selection for Hangman."""

import json
import random
from collections.abc import Sequence
from pathlib import Path


def load_words(path: Path) -> list[str]:
    """Load and validate the playable words from a JSON array."""
    try:
        with path.open("r", encoding="utf-8") as file:
            words = json.load(file)
    except FileNotFoundError as error:
        raise ValueError(f"Word list not found: {path}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"Word list contains invalid JSON: {path}") from error

    if (
        not isinstance(words, list)
        or not words
        or any(not isinstance(word, str) or not word or not word.isalpha() for word in words)
    ):
        raise ValueError("Word list must contain only non-empty alphabetic words.")

    return words


def choose_word(words: Sequence[str]) -> str:
    """Return a random playable word from the given word list."""
    playable_words = [word for word in words if word and word.isalpha()]
    if not playable_words:
        raise ValueError("At least one alphabetic word is required.")

    return random.choice(playable_words)