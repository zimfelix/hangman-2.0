"""Tests for Hangman word selection."""

import pytest

from backend.words import choose_word


def test_choose_word_returns_word_from_given_list() -> None:
    """Covers: S002-AK1."""
    words = ["python"]

    assert choose_word(words) == "python"


def test_choose_word_rejects_empty_word_list() -> None:
    """Covers: S002-AK2."""
    with pytest.raises(ValueError, match="alphabetic word"):
        choose_word([])


def test_choose_word_rejects_list_without_playable_words() -> None:
    """Covers: S002-AK3."""
    with pytest.raises(ValueError, match="alphabetic word"):
        choose_word(["", "123", "hang man"])


def test_choose_word_ignores_unplayable_words() -> None:
    """Covers: S002-AK4."""
    words = ["", "hang man", "python3", "python"]

    assert choose_word(words) == "python"
