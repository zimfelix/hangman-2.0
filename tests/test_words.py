"""Tests for Hangman word selection."""

import json

import pytest

from backend.words import choose_word, load_words


def test_load_words_reads_json_array(tmp_path) -> None:
    """Covers: S005-AK1, S005-AK2."""
    path = tmp_path / "words.json"
    path.write_text(json.dumps(["python", "hangman"]), encoding="utf-8")

    assert load_words(path) == ["python", "hangman"]


def test_load_words_rejects_missing_or_invalid_data(tmp_path) -> None:
    """Covers: S005-AK3."""
    with pytest.raises(ValueError, match="not found"):
        load_words(tmp_path / "missing.json")

    path = tmp_path / "invalid.json"
    path.write_text(json.dumps(["python", "not playable!"]), encoding="utf-8")

    with pytest.raises(ValueError, match="only non-empty alphabetic words"):
        load_words(path)


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
