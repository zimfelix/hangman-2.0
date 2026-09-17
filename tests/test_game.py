"""Tests for Hangman game rules."""

from backend.game import GuessResult, Hangman


def test_guess_is_case_insensitive() -> None:
    """Covers: S001-AK4."""
    game = Hangman("Python")

    result = game.guess("P")

    assert result is GuessResult.CORRECT
    assert game.revealed_word.startswith("p")


def test_invalid_and_repeated_guesses_do_not_cost_attempts() -> None:
    """Covers: S001-AK5."""
    game = Hangman("python")
    initial_attempts = game.remaining_attempts

    assert game.guess("py") is GuessResult.INVALID
    assert game.remaining_attempts == initial_attempts

    assert game.guess("p") is GuessResult.CORRECT
    attempts_after_valid_guess = game.remaining_attempts
    assert game.guess("p") is GuessResult.ALREADY_GUESSED
    assert game.remaining_attempts == attempts_after_valid_guess


def test_correct_guess_reveals_every_occurrence() -> None:
    """Covers: S001-AK6."""
    game = Hangman("letter")

    game.guess("t")

    assert game.revealed_word == "_ _ t t _ _"


def test_wrong_guess_reduces_remaining_attempts() -> None:
    """Covers: S001-AK7."""
    game = Hangman("python", max_incorrect_guesses=6)

    result = game.guess("x")

    assert result is GuessResult.INCORRECT
    assert game.remaining_attempts == 5


def test_game_recognizes_win_and_loss() -> None:
    """Covers: S001-AK8."""
    winning_game = Hangman("a")
    winning_game.guess("a")

    losing_game = Hangman("a", max_incorrect_guesses=1)
    losing_game.guess("b")

    assert winning_game.is_won
    assert not winning_game.is_lost
    assert losing_game.is_lost
    assert not losing_game.is_won
