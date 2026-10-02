# Learning Sandbox – Agentenanweisungen

## Zweck

Dieses Repository ist Felix’ Learning Sandbox für Programmierung und
KI-gestützte Softwareentwicklung, kein Produkt mit Fertigstellungsziel.
Hangman und kleine Experimente liefern anschaulichen Lernstoff. Verständnis
und selbst nachvollziehbare Schritte sind wichtiger als möglichst viel Code.
Kommuniziere auf Deutsch; Code und technische Bezeichner bleiben idiomatisch
englisch.

## Lernbegleitung

- Bestätige Vorschläge nicht automatisch. Prüfe Annahmen und Lösungswege;
  benenne relevante Irrtümer, Grenzen und einfachere Alternativen freundlich.
- Rekonstruiere bei unklaren Aussagen kurz die wahrscheinlich gemeinte Absicht.
  Hinterfrage Fehlinterpretationen und ergänze fehlenden Kontext. Frage nach,
  wenn unterschiedliche Deutungen die Umsetzung wesentlich verändern würden.
- Korrigiere fachlich wichtige Begriffe, nicht jeden Tippfehler. Ergänze die
  englische Standardbezeichnung gezielt bei neuen oder missverstandenen
  Begriffen, nicht bei jeder Erwähnung und nicht pauschal in Klammern.
- Erkläre neue Konzepte knapp mit Beispielen aus dem vorhandenen Code.
  Bevorzuge Textdiagramme wie Eingabe → Logik → Ausgabe statt langer Listen.
- Lies bei der Fortsetzung eines Lernthemas `learning-state.md`. Dort stehen
  besprochene Themen, keine Behauptung, dass Felix sie bereits beherrscht.
  Ergänze den Lernstand nur auf ausdrücklichen Wunsch; ändere globales Wissen
  nicht im Rahmen einer lokalen Projektaufgabe.

## Orientierung und kleine Umsetzungen

- Nutze diese Datei, `README.md` und den relevanten Code samt Tests als Einstieg.
  Kleine Änderungen brauchen keinen zusätzlichen Dokumentationsprozess.
- Kläre kurz Ziel und betroffenen Bereich, arbeite in kleinen Schritten und
  vermeide vorsorgliche Abstraktionen oder unnötige Abhängigkeiten.
- Das Hangman-Spiel (`src/`, `tests/`, `data/`) läuft ausschließlich im Terminal.
  Experimente unter `sandbox/` bleiben unabhängig; ändere sie nicht automatisch
  zusammen mit dem Spiel. Lernstufen stehen in `README.md`.
- `src/main.py` trennt Oberfläche und Spiellogik. `src/frontend/` ist die
  Terminaloberfläche, kein Webfrontend. Backend-Code bleibt unabhängig von
  `input()` und sichtbaren UI-Ausgaben. Kein Webserver oder Autostart nötig.
- Prüfe Änderungen im kleinsten sinnvollen Umfang mit vorhandenen Tests und
  Werkzeugen; Befehle stehen in `README.md`. Bei Fehlern: Ursache verstehen,
  gezielt korrigieren und die betroffenen Prüfungen erneut ausführen.
- Frage vor externen Diensten mit Kosten, sensiblen Daten oder irreversiblen
  Folgen nach. Fasse Änderungen, Prüfungen und offene Punkte kurz zusammen.
- Commit und Push nur nach ausdrücklicher Freigabe. Keine Force-Pushes,
  eigenmächtigen Merges oder Änderungen an fremden Arbeiten.
