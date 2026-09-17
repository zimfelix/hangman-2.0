# Hangman

Ein kleines Hangman-Konsolenspiel in Python.

## Projektstruktur

```text
hangman/
├── AGENTS.md               # Kurzer Wegweiser für Coding-Agenten
├── harness/                # Allgemeine und projektspezifische Arbeitsregeln
│   ├── rules/
│   │   ├── core.md         # Wiederverwendbarer minimaler Coding-Harness
│   │   ├── code.md         # Python-Codekonventionen für Hangman
│   │   └── project.md      # Profil und Grenzen dieses Projekts
│   ├── templates/
│   │   ├── project-init.md # Einmalige Vorlage für neue Projekte
│   │   └── story.md        # Vorlage für kleine Anforderungen
├── specs/                  # Konkrete Anforderungen und Akzeptanzkriterien
├── scripts/
│   └── verify.py           # Zentrales Quality Gate
├── src/
│   ├── main.py              # Startpunkt: verbindet Frontend und Backend
│   ├── backend/             # Spiellogik und Daten
│   │   ├── __init__.py
│   │   ├── game.py          # Regeln und Spielzustand
│   │   └── words.py         # Wörter und Wortauswahl
│   └── frontend/            # Benutzeroberfläche
│       ├── __init__.py
│       └── ui.py            # Terminal-Ausgabe und Eingaben
├── tests/                   # Spätere automatische Tests
└── README.md
```

## Bedeutung

- `frontend/`: Alles, was der Benutzer sieht oder eingibt.
- `backend/`: Die eigentliche Spiellogik im Hintergrund.
- `main.py`: Startet das Programm und verbindet Frontend mit Backend.
- `tests/`: Hier kommen später Tests rein.
- `harness/rules/core.md`: Projektübergreifende Arbeits- und Prüfregeln.
- `harness/rules/code.md`: Sprach- und projektspezifische Python-Codekonventionen.
- `harness/rules/project.md`: Nur für Hangman geltende Technik- und Architekturregeln.
- `harness/templates/project-init.md`: Einmaliger Initial-Prompt für neue Projekte.
- `specs/`: Beschreibt gewünschtes Verhalten, bevor es implementiert wird.

## Starten

```bash
.venv/bin/python src/main.py
```

Das Projekt verwendet die lokale virtuelle Umgebung `.venv` mit Python 3.14.

## Entwicklungswerkzeuge installieren

```bash
.venv/bin/python -m pip install -r requirements-dev.txt
```

## Quality Gate ausführen

```bash
.venv/bin/python scripts/verify.py
```

Das Quality Gate prüft Syntax, Ruff, pytest und die Zuordnung der
Akzeptanzkriterien zu Tests.

## Clean-Code-Grundlagen für zukünftige Projekte

Diese Prinzipien verwenden wir als Leitlinie – verständlicher Code ist wichtiger als unnötige Abstraktion.

### Lesbarkeit zuerst

- Aussagekräftige Namen verwenden: `guessed_letters` statt `data`.
- Kleine Funktionen schreiben, die genau eine Aufgabe haben.
- Verschachtelungen möglichst flach halten.
- Kommentare nur für das **Warum**, nicht für offensichtlichen Code.
- Einheitlich formatieren und PEP 8 beachten.

### Funktionen und Klassen

- Funktionen sollen eine klare Verantwortung besitzen.
- Eingaben über Parameter übergeben und Ergebnisse mit `return` zurückgeben.
- Seiteneffekte wie `input()` und `print()` möglichst im UI bündeln.
- Klassen nur verwenden, wenn Daten und zugehöriges Verhalten gemeinsam verwaltet werden.
- `__init__` nur für die Initialisierung des Objektzustands verwenden.

### Qualität und Wartbarkeit

- Keine unnötige Duplizierung (DRY), aber nicht zu früh abstrahieren.
- Backend und Frontend voneinander trennen.
- Ungültige Eingaben kontrolliert behandeln.
- Kleine, fokussierte Tests für die Spiellogik schreiben.
- Verständlichen, einfachen Code komplizierter Cleverness vorziehen.
- Änderungen in kleinen, nachvollziehbaren Schritten umsetzen.

### Unsere Arbeitsweise

1. Erst eine einfache funktionierende Version bauen.
2. Verantwortlichkeiten erkennen und sauber trennen.
3. Code mit Tests absichern.
4. Danach gezielt refaktorieren und erweitern.
