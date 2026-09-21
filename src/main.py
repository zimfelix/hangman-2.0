"""Startpunkt für das Hangman-Spiel. main.py verbindet Frontend/UI und Backend/Spiellogik."""

from pathlib import Path

from backend.game import Hangman
from backend.persistence import load_statistics, save_statistics
from backend.words import choose_word
from frontend import ui

STATISTICS_PATH = Path("data/statistics.json")

def play_round() -> bool:
    """Play one complete round and return whether it was won."""
    ui.show_difficulty_menu()
    max_incorrect_guesses = ui.get_max_incorrect_guesses()
    game = Hangman(choose_word(), max_incorrect_guesses)

    while not game.is_over:
        ui.show_game_state(game)
        result = game.guess(ui.get_letter())
        ui.show_guess_result(result)

    ui.show_game_state(game)
    ui.show_round_result(game)
    return game.is_won


def main() -> None:
    """Startet das Spiel."""
    session_wins = 0
    session_losses = 0
    ui.show_welcome()

    statistics = load_statistics(STATISTICS_PATH)

    while True:
        ui.show_main_menu()
        choice = ui.get_menu_choice()

        if choice == "1":
            if play_round():
                session_wins += 1
                statistics["wins"] += 1
            else:
                session_losses += 1
                statistics["losses"] += 1

            save_statistics(STATISTICS_PATH, statistics)
        elif choice == "2":
            ui.show_rules()
        elif choice == "3":
            ui.show_session_statistics(
                session_wins,
                session_losses,
                statistics["wins"],
                statistics["losses"],
            )
        else:
            ui.show_exit_message()
            return


if __name__ == "__main__":
    main()
