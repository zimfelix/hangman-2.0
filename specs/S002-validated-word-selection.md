# S002 – Validierte Wortauswahl

## Meta

- **State:** Implemented

## User Story

Als Spieler möchte ich, dass eine neue Runde immer mit einem gültigen Hangman-Wort startet, damit das Spiel nicht durch ungeeignete Wortdaten abstürzt.

## Beschreibung

Die Wortauswahl liefert nur nicht-leere alphabetische Wörter. Wenn keine geeigneten Wörter vorhanden sind, wird der Fehler kontrolliert und verständlich gemeldet.

## Akzeptanzkriterien

- **AK1:** Die Wortauswahl liefert ein Wort aus der übergebenen Wortliste.
- **AK2:** Eine leere Wortliste erzeugt einen `ValueError` mit verständlicher Meldung.
- **AK3:** Eine Wortliste ohne spielbare Wörter erzeugt einen `ValueError` mit verständlicher Meldung.
- **AK4:** Wörter mit Leerzeichen oder nicht-alphabetischen Zeichen werden nicht ausgewählt.

## Nicht im Umfang

- neue Wortkategorien
- Auswahl einer Schwierigkeit
- dauerhaft gespeicherte Wortlisten

## Nachweise

Automatisierte Tests verwenden Marker wie `S002-AK1`.

- **Quality Gate:** `PASS` — `.venv/bin/python scripts/verify.py`.
