# Agentic Harness V2 – Starter-Kit

Dieses Verzeichnis entwickelt ein kopierbares Starter-Kit. Beim Einsatz in einem neuen Projekt werden `AGENTS.md`, `README.md`, `learning-state.md`, `harness/rules/`, `harness/templates/` und der Gate-Runner kopiert; die V2-Entwicklungsartefakte in `ideas/`, `specs/` und `tests/` werden **nicht** übernommen. Bei Project Init wird der kopierte Learning State auf das neue Projekt ausgerichtet: V2-spezifische Erkenntnisse und Arbeitsstände werden nicht als Projektwissen übernommen. `AGENTS.md` ist die kurze Einstiegskarte; unter `harness/rules/universal/` liegen wiederverwendbare Arbeits- und Qualitätsregeln. `harness/templates/` enthält Vorlagen für Projektinitialisierung, Ideas und Specs. Der Ordner `harness/rules/project-specific/` zeigt die vorgesehenen **Projektrichtlinien** bereits als Markdown-Dateien. Ihre konkreten Inhalte entstehen erst für das neue Projekt bei Project Init; bis dahin tragen sie `Status: Pending Project Init`. Das Projektprofil wird dann definiert, optionale Richtlinien nur bei Bedarf. Nicht passende Dateien bleiben sichtbar und markiert, gelten aber nicht als ausgearbeitete Projektrichtlinien. Im neuen Projekt werden `ideas/` für ungeklärte größere Vorhaben und `specs/` für konkrete Anforderungen bei Bedarf angelegt. `learning-state.md` hält neue Erkenntnisse und offene Überlegungen zunächst lokal fest; nur auf ausdrücklichen Wunsch werden geprüfte, projektübergreifende Learnings später verdichtet in die globalen `AGENTS.md`-Dateien von Pi (`~/.pi/agent/AGENTS.md`) und Codex (`~/.codex/AGENTS.md`) übernommen. Die `AGENTS.md` im aktuellen Projekt bleibt projektspezifisch.

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
| `project-specific/code.md`, `python.md`, `web.md`, `testing.md` | Nur benötigte Code-, Sprach-, Plattform- oder Testkonventionen; keine Kopie der universellen Regeln. |
| `project-specific/quality-matrix.md` | Bei Bedarf Zuordnung von Checks zu Projektbereichen; keine zweite Befehlsquelle. |
| `project-specific/quality-gate.json` und `scripts/verify.py` | Konkrete Checks beziehungsweise deren Ausführung; keine Produkt- oder Testpolitik. |
| `ideas/`, `specs/`, `learning-state.md` | Konkrete Vorhaben, Anforderungen beziehungsweise vorläufige Learnings – keine Harness-Regeln. |

## Quality Gate

`scripts/verify.py` ist ein neutraler Runner für projektbezogene Checks, **noch kein eingerichtetes Gate**. Er liest `harness/rules/project-specific/quality-gate.json` und schlägt ohne mindestens einen gültigen Check fehl. Project Init wählt geeignete Tests und Prüfungen, trägt sie dort ein, prüft sie durch Ausführung und dokumentiert den Gate-Befehl im Projektprofil. Format und Grenzen der Konfiguration stehen in `harness/templates/project-init.md`. Der Runner benötigt Python 3.9+; für Projekte ohne Python wird er durch einen bewusst gewählten projekttypischen Gate-Einstieg ersetzt.

Die universellen Regeln und Templates sollen im fertigen Starter-Kit bereits inhaltlich ausgearbeitet sein und ohne neue Project Init gelten. **Aktuell** enthalten einige davon noch kurze Aufgabenbeschreibungen; ihre Ausarbeitung ist der nächste Schritt, bevor V2 als fertiges Starter-Kit genutzt wird. Universelle Regeln beschreiben das *Wie* der Zusammenarbeit. Das Projektprofil beschreibt konkrete Fakten und Grenzen; die Gate-Konfiguration nennt ausführbare Befehle. Keine Dokumentation ersetzt eine tatsächlich durchgeführte Prüfung.
