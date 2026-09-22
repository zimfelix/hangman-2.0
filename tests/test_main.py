"""Tests for connecting the terminal UI to a round."""

import pytest

from frontend import ui
from main import play_round


@pytest.mark.parametrize("max_incorrect_guesses", [8, 6, 4])
def test_play_round_uses_selected_difficulty(
    monkeypatch, max_incorrect_guesses: int
) -> None:
    """Covers: S003-AK2, S005-AK4."""
    shown_games = []
    wrong_letters = iter("bcdefghi")

    monkeypatch.setattr("main.choose_word", lambda words: "a")
    monkeypatch.setattr(ui, "show_difficulty_menu", lambda: None)
    monkeypatch.setattr(
        ui, "get_max_incorrect_guesses", lambda: max_incorrect_guesses
    )
    monkeypatch.setattr(ui, "show_game_state", shown_games.append)
    monkeypatch.setattr(ui, "get_letter", lambda: next(wrong_letters))
    monkeypatch.setattr(ui, "show_guess_result", lambda result: None)
    monkeypatch.setattr(ui, "show_round_result", lambda game: None)

    won = play_round(["a"])

    assert not won
    assert shown_games[0].max_incorrect_guesses == max_incorrect_guesses
    assert shown_games[-1].is_lost
