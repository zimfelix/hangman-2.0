"""Wörter und Wortauswahl für Hangman."""

import random

WORDS = [
    "python",
    "hangman",
    "computer",
    "terminal",
    "programmieren",
]


def choose_word() -> str:
    """Return a random word for a new round."""
    return random.choice(WORDS)
