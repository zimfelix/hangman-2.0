# S005 – JSON-Wortliste

## Meta

- **State:** Implemented

## User Story

Als Spieler möchte ich, dass die Wortliste aus einer JSON-Datei geladen wird,
damit Wortdaten unabhängig vom Python-Code gepflegt werden können.

## Beschreibung

`data/words.json` ist die verbindliche Wortquelle. Die Anwendung lädt daraus eine
Liste alphabetischer, nicht-leerer Wörter und verwendet sie für neue Runden.
Eine fehlende oder ungültige Datei wird nicht durch eine eingebettete Ersatzliste
verdeckt.

## Akzeptanzkriterien

- **AK1:** `data/words.json` enthält die Wortliste als JSON-Array.
- **AK2:** `load_words()` lädt ein gültiges JSON-Array als Python-Liste.
- **AK3:** Eine fehlende, ungültige oder nicht spielbare Wortdatei erzeugt einen
  verständlichen Fehler.
- **AK4:** `main.py` lädt die Wortliste und verwendet sie bei der Auswahl eines
  Rundenworts.

## Nicht im Umfang

- Bearbeiten oder Speichern der Wortliste im laufenden Programm
- Wortkategorien oder mehrere Wortdateien
- Fallback auf eine in Python eingebettete Wortliste

## Nachweise

Automatisierte Tests verwenden Marker wie `S005-AK1`.

- **Quality Gate:** `PASS` — `.venv/bin/python scripts/verify.py`.
