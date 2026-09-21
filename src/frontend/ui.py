"""Terminal user interface for Hangman."""

from backend.game import GuessResult, Hangman

DIFFICULTY_ATTEMPTS = {
    "1": 8,
    "2": 6,
    "3": 4,
}

HANGMAN_STAGES = (
    r"""
          
          
          
          
          
    =========
    """,
    r"""
      |   
      |   
      |   
      |   
      |   
    =========
    """,
    r"""
      +---+
      |    
      |    
      |    
      |    
    =========
    """,
    r"""
      +---+
      |   |
          |
          |
          |
          |
    =========
    """,
    r"""
      +---+
      |   |
      O   |
          |
          |
          |
    =========
    """,
    r"""
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========
    """,
    r"""
      +---+
      |   |
      O   |
     /|\  |
          |
          |
    =========
    """,
    r"""
      +---+
      |   |
      O   |
     /|\  |
     /    |
          |
    =========
    """,
    r"""
      +---+
      |   |
      O   |
     /|\  |
     / \  |
          |
    =========
    """,
)


def show_welcome() -> None:
    """Display the application heading."""
    print("\n============================")
    print("   Willkommen bei Hangman!")
    print("============================")


def show_main_menu() -> None:
    """Display all available main-menu actions."""
    print("\nHauptmenü")
    print("1. Spiel starten")
    print("2. Regeln")
    print("3. Statistik")
    print("4. Beenden")


def get_menu_choice() -> str:
    """Ask for a valid main-menu choice."""
    while True:
        choice = input("Deine Auswahl: ").strip()
        if choice in {"1", "2", "3", "4"}:
            return choice
        print("Ungültige Auswahl. Bitte wähle 1, 2, 3 oder 4.")


def get_letter() -> str:
    """Ask the player for one letter without applying game rules."""
    return input("Rate einen Buchstaben: ").strip()


def show_difficulty_menu() -> None:
    """Display the available difficulty levels."""
    print("\nSchwierigkeitsgrad")
    print("1. Leicht (8 Fehlversuche)")
    print("2. Normal (6 Fehlversuche)")
    print("3. Schwer (4 Fehlversuche)")


def get_max_incorrect_guesses() -> int:
    """Ask for a difficulty level and return its allowed incorrect guesses."""
    while True:
        choice = input("Deine Auswahl: ").strip()
        if choice in DIFFICULTY_ATTEMPTS:
            return DIFFICULTY_ATTEMPTS[choice]
        print("Ungültige Auswahl. Bitte wähle 1, 2 oder 3.")


def show_game_state(game: Hangman) -> None:
    """Display the current state of a round."""
    stage_index = (game.incorrect_guesses * (len(HANGMAN_STAGES) - 1)) // game.max_incorrect_guesses
    guessed_letters = ", ".join(game.guessed_letters) or "noch keine"

    print(HANGMAN_STAGES[stage_index])
    print(f"Wort: {game.revealed_word}")
    print(f"Geratene Buchstaben: {guessed_letters}")
    print(f"Verbleibende Fehlversuche: {game.remaining_attempts}")


def show_guess_result(result: GuessResult) -> None:
    """Display feedback for one guess."""
    messages = {
        GuessResult.CORRECT: "Treffer! Der Buchstabe kommt im Wort vor.",
        GuessResult.INCORRECT: "Leider falsch. Du verlierst einen Fehlversuch.",
        GuessResult.ALREADY_GUESSED: "Diesen Buchstaben hast du bereits geraten.",
        GuessResult.INVALID: "Bitte gib genau einen Buchstaben ein.",
    }
    print(messages[result])


def show_round_result(game: Hangman) -> None:
    """Display the result of a completed round."""
    if game.is_won:
        print(f"\nGewonnen! Das Wort war „{game.word}“.")
    else:
        print(f"\nVerloren! Das gesuchte Wort war „{game.word}“.")


def show_rules() -> None:
    """Display concise game instructions."""
    print("\nSo funktioniert Hangman:")
    print("- Rate pro Runde jeweils einen Buchstaben.")
    print("- Richtige Buchstaben werden im Wort aufgedeckt.")
    print("- Nach sechs falschen Buchstaben ist die Runde verloren.")
    print("- Du gewinnst, wenn du das Wort rechtzeitig vollständig aufdeckst.")


def show_session_statistics(wins: int, losses: int) -> None:
    """Display results from the current program session."""
    print("\nStatistik dieser Sitzung")
    print(f"Gewonnen: {wins}")
    print(f"Verloren: {losses}")


def show_exit_message() -> None:
    """Display a friendly closing message."""
    print("\nAuf Wiedersehen und viel Spaß beim nächsten Mal!")
