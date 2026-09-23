# Harness V2 im Hangman-Repository

Dieser Harness wird hier für zwei getrennte lokale Lernprojekte eingesetzt: das Python-Terminalspiel und die eigenständige React-Website. Einstieg und Startbefehle stehen in `../README.md`, die konkreten Grenzen und Gates in `harness/rules/project-specific/project.md`. Der bisherige Root-Harness `../harness/` bleibt unverändert und ist für V2-Arbeit nicht die Regelquelle. Die V2-Entwicklungsartefakte `ideas/`, `specs/` und `tests/` bleiben Starter-Kit-Artefakte und sind keine Hangman-Feature-Specs. `learning-state.md` bleibt eine nur auf ausdrücklichen Sammelauftrag gepflegte Wissenssammlung, kein Project-Init-Statuslog. Nicht benötigte optionale Regeln bleiben sichtbar auf `Pending Project Init`.

## Zuständigkeiten – eine Quelle pro Regel

| Ort | Einzige Aufgabe |
|---|---|
| `AGENTS.md` | Einstieg und Verweise auf relevante Dateien; kein zweiter Core. |
| `harness/rules/universal/core.md` | Universeller Ablauf und Entscheidung, *wann* Idea, Spec und Gate nötig sind. |
| `harness/rules/universal/ideas.md` | *Wie* ein unklares Vorhaben im Dialog geklärt und bestätigt wird. |
| `harness/rules/universal/quality.md` | Prinzipien zur Auswahl passender Nachweise, keine Projektbefehle. |
| `harness/templates/idea.md`, `story.md` | Form der jeweiligen Artefakte, keine parallelen Prozessregeln. |
| `harness/templates/project-init.md` | Fragen und Schritte zur einmaligen projektspezifischen Initialisierung. |
| `harness/rules/project-specific/project.md` | Tatsächliche Ziele, Grenzen, Architektur und Gate-Einstieg des neuen Projekts. |
| `harness/rules/project-specific/code.md`, `python.md`, `web.md`, `testing.md` | Nur benötigte Code-, Sprach-, Plattform- oder Testkonventionen; keine Kopie der universellen Regeln. |
| `harness/rules/project-specific/quality-matrix.md` | Bei Bedarf Zuordnung von Checks zu Projektbereichen; keine zweite Befehlsquelle. |
| Gate-Konfiguration und -Einstieg (z. B. `quality-gate.json` und `scripts/verify.py`) | Konkrete Checks beziehungsweise deren Ausführung; keine Produkt- oder Testpolitik. |
| `ideas/`, `specs/`, `learning-state.md` | V2-Entwicklungsideen/-Specs und manuell gesammelte Erkenntnisse; Hangman-Feature-Specs liegen unter `../specs/` – keine Harness-Regeln oder Chatprotokolle. |

## Quality Gate

Vom Repository-Root führt `.venv/bin/python harness-v2/scripts/verify.py` die vier in `harness/rules/project-specific/quality-gate.json` definierten Checks aus: Terminal-Gate, Web-Gate, V2-Unit-Tests und V2-Ruff. Jedes Bereichs-Gate wird dabei einmal aufgerufen; den V2-Runner nicht selbst als Check konfigurieren. Für einzelne Bereiche stehen `.venv/bin/python scripts/verify.py` und `npm --prefix web run verify` zur Verfügung. Vor der Ausführung Python- und npm-Abhängigkeiten sowie Playwright-Chromium installieren; das Web-Gate baut die Website und testet sie im Browser. `tests/test_verify.py` testet nur den V2-Runner, nicht das Hangman-Spiel. Dessen Specs liegen unter `../specs/terminal/` und `../specs/web/`.

Universelle Regeln beschreiben das *Wie* der Zusammenarbeit; das Projektprofil beschreibt konkrete Fakten und Grenzen, die Gate-Konfiguration ausführbare Befehle. Keine Dokumentation ersetzt eine tatsächlich durchgeführte Prüfung.
