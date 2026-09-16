"""Startpunkt für das Hangman-Spiel.

main.py verbindet Frontend/UI und Backend/Spiellogik.
"""

from frontend.ui import show_welcome


def main():
    """Startet das Spiel."""
    show_welcome()
    print("Hangman startet bald!")


if __name__ == "__main__":
    main()