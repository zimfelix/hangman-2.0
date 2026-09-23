# Learning State – Harness V2

Diese Datei ist der lokale Zwischenspeicher für neue Erkenntnisse und den Arbeitsstand dieses Vorhabens. Wenn Felix sagt „Das ist ein neuer Kern“, „Speicher dieses Wissen ab“ oder sinngemäß eine Erkenntnis für später festhalten möchte, ergänze sie hier kurz; markiere Ungeprüftes als offen und verwerfe es nicht stillschweigend. Lies diese Datei bei der Fortsetzung der Harness-V2-Arbeit, statt frühere Chats vorauszusetzen. Übertrage nichts automatisch in die globalen `AGENTS.md`-Dateien (`~/.pi/agent/AGENTS.md` und `~/.codex/AGENTS.md`): Erst auf ausdrücklichen Wunsch werden die gesammelten Punkte geprüft, verdichtet und nur dauerhaft nützliche, projektübergreifende Erkenntnisse dort übernommen. „Projektspezifische AGENTS.md“ meint stets die Datei im aktuellen Projekt.

## Neue Erkenntnisse – Zwischenspeicher

- **Bestätigt:** Universelle Regeln und Templates sollen im fertigen Starter-Kit ausgearbeitet sein; projektbezogene Richtlinien erhalten ihren konkreten Inhalt erst bei Project Init.
- **Bestätigt:** Der Learning State sammelt zunächst neue Learnings und offene Überlegungen. Eine spätere Übernahme in beide globalen `AGENTS.md`-Dateien ist ein bewusster, getrennter Schritt.
- **Bestätigt:** Jede Harness-Regel hat einen zuständigen Ort. Vor neuen Regeln thematisch benachbarte Dateien und danach den Diff auf inhaltliche Doppelungen prüfen; sonst nur verlinken.

## Arbeitsstand

**Ziel:** Ein kopierbares Level-2-Starter-Kit für unterschiedliche neue Projekte, nicht ein weiterer Hangman-Harness.

**Entschieden:** Universelle Regeln und Templates sollen im fertigen Starter-Kit bereits vollständig gelten. Vorgesehene Projektrichtlinien sind schon als Markdown-Dateien sichtbar, tragen aber bis zur Definition im neuen Projekt `Pending Project Init`. Project Init definiert das Projektprofil und nur benötigte optionale Richtlinien; andere bleiben erkennbar offen. Das Quality Gate scheitert ohne projektspezifisch konfigurierte, ausführbare Checks. Ideas klären große Vorhaben; Specs halten konkrete beauftragte Änderungen fest. Global bestätigte Learnings stehen in den Agent-Anweisungen von Pi und Codex.

**Stand:** Die vorgesehenen Projektrichtlinien und der Fail-Closed-Gate-Runner sind angelegt; isolierte Runner-Tests und Ruff sind grün. `universal/core.md` und `templates/story.md` sind aus V1 abgeleitet und für V2 ausgearbeitet; der Core bewahrt ausdrücklich Specs als Quelle, AK-Nachweise, Gate-Korrekturschleife und sichere Lieferung und ergänzt Freigabegrenzen, gezielte Neubewertung bei Scope-Wachstum und Diff-Prüfung. `universal/ideas.md`, `universal/quality.md` und `templates/idea.md` sind noch Aufgabenbeschreibungen. Die V2-Idea und Entwicklungs-Specs sind keine Dateien zum Kopieren in neue Projekte.

**Nächster Schritt:** Den Core an klarer Änderung, unklarer Idea, Bugfix ohne neue Spec und unerwarteter Integration prüfen. Danach Ideas-Regel und -Vorlage sowie Quality-Regel schrittweise ausarbeiten; anschließend an unterschiedlichen Projektarten testen und ein neues Projekt testweise initialisieren. Keine automatische Übernahme in den bestehenden Hangman-Harness.
