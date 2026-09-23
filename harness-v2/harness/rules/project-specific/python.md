# Python-Bereich: Terminalspiel

Gilt für `src/`, `tests/`, `data/` und `scripts/`. Python >=3.14; die
Konfiguration steht in `pyproject.toml`. Starte die Anwendung vom Repository-
Root (relative Pfade in `src/main.py`).

- `src/main.py` orchestriert `src/frontend/ui.py` und `src/backend/`.
  Benutzereingaben und deutsche Ausgabetexte gehören nach `src/frontend/ui.py`;
  die gemeinsame Trennung von Regeln und I/O steht in `code.md`.
- Wortdaten und Gesamtstatistik sind getrennte JSON-Dateien unter `data/`.
  `src/backend/words.py` lädt die Wortliste ohne eingebettete Ersatzliste.
  Die aktive Statistikpersistenz ist `src/backend/persistence_v1.py`, nicht
  das zusätzliche `persistence_v2.py`-Lernbeispiel.
- Neue Python-Änderungen mit der vorhandenen pytest-Suite und Ruff nachweisen;
  Gate und genaue Checks stehen in `project.md` und `quality-gate.json`.
