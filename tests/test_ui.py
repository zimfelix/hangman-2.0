"""Tests for the terminal user interface."""

import pytest

from backend.game import Hangman
from frontend.ui import (
    get_max_incorrect_guesses,
    get_menu_choice,
    show_difficulty_menu,
    show_exit_message,
    show_game_state,
    show_main_menu,
    show_round_result,
    show_rules,
    show_session_statistics,
    show_welcome,
)


def test_welcome_and_main_menu_are_displayed(capsys) -> None:
    """Covers: S001-AK1."""
    show_welcome()
    show_main_menu()

    output = capsys.readouterr().out
    assert "Willkommen bei Hangman" in output
    assert "Spiel starten" in output
    assert "Regeln" in output
    assert "Statistik" in output
    assert "Beenden" in output


def test_difficulty_menu_is_displayed(capsys) -> None:
    """Covers: S003-AK1."""
    show_difficulty_menu()

    output = capsys.readouterr().out
    assert "Leicht (8 Fehlversuche)" in output
    assert "Normal (6 Fehlversuche)" in output
    assert "Schwer (4 Fehlversuche)" in output


def test_invalid_difficulty_choice_is_requested_again(monkeypatch, capsys) -> None:
    """Covers: S003-AK3."""
    answers = iter(["0", "2"])
    monkeypatch.setattr("builtins.input", lambda _: next(answers))

    max_incorrect_guesses = get_max_incorrect_guesses()

    assert max_incorrect_guesses == 6
    assert "Ungültige Auswahl" in capsys.readouterr().out


def test_invalid_menu_choice_is_requested_again(monkeypatch, capsys) -> None:
    """Covers: S001-AK2."""
    answers = iter(["unbekannt", "1"])
    monkeypatch.setattr("builtins.input", lambda _: next(answers))

    choice = get_menu_choice()

    assert choice == "1"
    assert "Ungültige Auswahl" in capsys.readouterr().out


def test_game_state_contains_all_relevant_information(capsys) -> None:
    """Covers: S001-AK3."""
    game = Hangman("python")
    game.guess("p")
    game.guess("x")

    show_game_state(game)

    output = capsys.readouterr().out
    assert "=========" in output
    assert "p _ _ _ _ _" in output
    assert "Geratene Buchstaben: p, x" in output
    assert "Verbleibende Fehlversuche: 5" in output


@pytest.mark.parametrize("max_incorrect_guesses", [4, 6, 8])
def test_hangman_stage_reaches_a_complete_figure(capsys, max_incorrect_guesses) -> None:
    """Covers: S003-AK4."""
    game = Hangman("a", max_incorrect_guesses=max_incorrect_guesses)
    displayed_stages = []

    for letter in "bcdefghi"[:max_incorrect_guesses]:
        game.guess(letter)
        show_game_state(game)
        displayed_stages.append(capsys.readouterr().out)

    assert len(set(displayed_stages)) == max_incorrect_guesses
    assert "/ \\" in displayed_stages[-1]


def test_rules_are_displayed(capsys) -> None:
    """Covers: S001-AK9."""
    show_rules()

    assert "So funktioniert Hangman" in capsys.readouterr().out


def test_session_statistics_are_displayed(capsys) -> None:
    """Covers: S001-AK10."""
    show_session_statistics(wins=2, losses=1)

    output = capsys.readouterr().out
    assert "Gewonnen: 2" in output
    assert "Verloren: 1" in output


def test_exit_message_is_displayed(capsys) -> None:
    """Covers: S001-AK11."""
    show_exit_message()

    assert "Auf Wiedersehen" in capsys.readouterr().out


def test_round_result_is_displayed(capsys) -> None:
    """Additional evidence for S001-AK8."""
    won_game = Hangman("a")
    won_game.guess("a")

    show_round_result(won_game)

    assert "Gewonnen" in capsys.readouterr().out
