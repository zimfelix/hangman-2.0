"""Benutzeroberfläche für Hangman.

Hier kommt alles rein, was der Spieler sieht oder eingibt:
- Text im Terminal ausgeben
- Buchstaben abfragen
- Spielstand anzeigen
"""


def show_welcome():
    """Zeigt eine kurze Begrüßung."""
    print("Willkommen bei Hangman!")

def get_choice():
    choice = input("Select choice: ").strip()

    if choice in {"1", "2", "3", "4"}:
        return choice

    print("Invalid choice")
    return None

def menu_choice(choice):
    if choice == "1":
        print("Start game")
    elif choice == "2":
        print("Show rules")
    elif choice == "3":
        print("Show highscore")
    elif choice == "4":
        print("Exit")
