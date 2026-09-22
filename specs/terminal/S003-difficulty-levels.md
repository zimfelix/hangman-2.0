# S003 – Schwierigkeitsstufen

## Meta

- **State:** Implemented

## User Story

Als Spieler möchte ich vor jeder Runde eine Schwierigkeitsstufe auswählen, damit
ich mit 4, 6 oder 8 erlaubten Fehlversuchen spielen kann.

## Beschreibung

Vor dem Start einer Runde wählt der Spieler leicht, normal oder schwer. Die
Spielrunde verwendet die dazugehörige Zahl erlaubter Fehlversuche. Die
Galgenanzeige bildet ihren Fortschritt unabhängig von der gewählten Zahl sinnvoll
bis zur vollständigen Figur ab.

## Akzeptanzkriterien

- **AK1:** Vor jeder neuen Runde zeigt die UI die Stufen leicht (8), normal (6)
  und schwer (4) an und fragt nach einer Auswahl.
- **AK2:** Die Auswahl startet die Runde mit 8, 6 beziehungsweise 4 erlaubten
  Fehlversuchen.
- **AK3:** Eine ungültige Auswahl zeigt einen Hinweis und fragt erneut nach.
- **AK4:** Die Galgenanzeige zeigt bei 4, 6 und 8 Fehlversuchen jeweils eine
  zunehmende, beim Verlust vollständige Figur.

## Nicht im Umfang

- Wortkategorien je Schwierigkeitsstufe
- unterschiedliche Wortlisten oder Wortlängen
- dauerhaft gespeicherte bevorzugte Schwierigkeit

## Nachweise

Automatisierte Tests verwenden Marker wie `S003-AK1`.

- **Quality Gate:** `PASS` — `.venv/bin/python scripts/verify.py`.
