"""Words and word selection for Hangman."""

import random
from collections.abc import Sequence

WORDS = [
    "python",
    "hangman",
    "computer",
    "terminal",
    "programmieren",
]


def choose_word(words: Sequence[str] = WORDS) -> str:
    """Return a random playable word from the given word list."""
    playable_words = [word for word in words if word and word.isalpha()]
    if not playable_words:
        raise ValueError("At least one alphabetic word is required.")

    return random.choice(playable_words)
