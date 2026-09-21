# Projektprofil: Hangman 2.0

Diese Datei enthält ausschließlich Regeln und Fakten, die für dieses Repository
gelten. Allgemeine Arbeitsregeln stehen in `core.md`.

## Ziel und Erfahrungsniveau

- Das Projekt entwickelt schrittweise ein spielbares Hangman-Konsolenspiel.
- Es ist zugleich ein Python-Lernprojekt für einen Coding-Anfänger.
- Änderungen sollen verständlich bleiben und neue Konzepte kurz erklären.
- Eine einfache funktionierende Lösung hat Vorrang vor zusätzlichen Frameworks
  oder vorsorglichen Abstraktionen.

## Technik

- Sprache: Python 3.14
- Oberfläche: Terminal
- Lokale Umgebung: `.venv`
- Startbefehl: `.venv/bin/python src/main.py`
- Testframework: pytest
- Linter: Ruff
- Quality Gate: `.venv/bin/python scripts/verify.py`
- Konkrete Python-Codekonventionen stehen in `code.md`.

## Architektur

- `src/main.py` startet die Anwendung und verbindet UI mit Spiellogik.
- `src/frontend/` enthält `input()` und sichtbare Terminalausgaben.
- `src/backend/` enthält Spielzustand, Spielregeln und Wortdaten.
- Backend-Code darf weder `input()` aufrufen noch UI-Texte ausgeben.
- UI-Code darf Spielregeln darstellen, aber nicht selbst entscheiden.
- `tests/` enthält automatische Tests, vorrangig für die Spiellogik.

## Projektgrenzen

- Keine neue externe Abhängigkeit ohne konkreten Nutzen für eine aktive Spec.
- Verhalten der Spiellogik muss ohne Terminaleingaben testbar bleiben.

## Git-Delivery

- Dieses persönliche Lernprojekt arbeitet review-first: Nach einem bestandenen
  Quality Gate fasst der Agent Änderungen, Tests und offene Punkte kurz zusammen
  und wartet auf die ausdrückliche Freigabe des Nutzers.
- Commit und Push erfolgen nur nach dieser Freigabe. Ohne Freigabe darf der Agent
  weder automatisch committen noch pushen.
- Eine abgeschlossene Story wird gemeinsam mit ihrem Code, ihren Tests und den
  nötigen Konfigurationsänderungen in einem nachvollziehbaren Commit gesichert.
- Commit-Titel beginnen bei Story-Arbeit mit der Spec-ID, z. B. `S001: Terminal
  Hangman game`.
- Kleine Änderungen ohne Spec erhalten einen passenden Präfix wie `fix:`,
  `refactor:` oder `docs:`.
- Bei unklaren, fremden oder nicht zum Auftrag gehörenden Änderungen nicht
  automatisch committen oder pushen; zuerst darauf hinweisen.

## Derzeit nicht festgelegt

Diese Punkte sind Produktentscheidungen und werden in Specs festgelegt, nicht im
Harness:

- Sprache und genauer Wortlaut der Spieloberfläche
- vollständiger Spielablauf und Anzahl erlaubter Fehlversuche
- Auswahl oder Zufälligkeit der Wörter
- Regeln für wiederholte und ungültige Eingaben
- Umfang von Regeln, Highscore und erneutem Spielen

Bis dazu eine Spec existiert, darf der Agent diese Entscheidungen nicht als feste
Projektregeln behandeln.
