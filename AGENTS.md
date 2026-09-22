# Hangman – Agentenanweisungen

Dieses Repository enthält zwei getrennte Lernbereiche: ein Python-Terminalspiel
und ein React-/TypeScript-Webspiel. Kommuniziere mit dem Nutzer auf Deutsch;
Code, Dateinamen und technische Bezeichner bleiben idiomatisch englisch.

## Vor Änderungen

1. Lies `harness/rules/core.md` und `harness/rules/project.md`.
2. Wenn `harness/rules/project.md` fehlt oder noch Platzhalter enthält, führe
   einmal die Projektinitialisierung anhand von
   `harness/templates/project-init.md` durch. Ist das Projektprofil ausgefüllt,
   starte Project Init nicht erneut.
3. Lies nur die relevante Spec unter `specs/terminal/` oder `specs/web/`.
4. Bei Terminal-Code in `src/`, `tests/`, `data/` oder `scripts/` lies zusätzlich
   `harness/rules/python.md`.
5. Bei Web-Code in `web/` lies zusätzlich `harness/rules/code.md`,
   `harness/rules/web.md` und bei Teständerungen `harness/rules/testing.md`.
6. Bei neuem oder verändertem Verhalten formuliere zuerst eine kleine Spec nach
   `harness/templates/story.md` im passenden Spec-Ordner. Reine Dokumentations-
   und interne Refactoring-Aufgaben benötigen keine neue Story.

## Arbeitsweise

- Terminal und Website sind getrennte Umsetzungen. Aktualisiere die Website nach
  einer Terminaländerung nur auf ausdrücklichen Auftrag und mit eigener
  Web-Story; ändere das Terminalspiel für eine Webänderung niemals automatisch.
- Erkläre neue Konzepte kurz und verständlich.
- Bevorzuge kleine, nachvollziehbare Schritte und vermeide verfrühte Abstraktion.
- Übernimm aus Designreferenzen nur dokumentierte Gestaltungsprinzipien. Kopiere
  niemals Marken, Texte, Assets, Quellcode oder Tracking fremder Websites.
- Triff offene Produktentscheidungen nicht eigenständig; frage vor Spec oder
  Implementierung nach.
- Prüfe Änderungen im kleinstmöglichen sinnvollen Umfang.
- Führe vor dem Story-State `Implemented` das passende Quality Gate aus.
- Wende bei Fehlern die Korrekturschleife aus `harness/rules/core.md` an.
- Ändere Harness-Regeln niemals automatisch wegen eines einzelnen Fehlers.
- Folge nach bestandenem Quality Gate der Git-Delivery-Policy aus
  `harness/rules/project.md`: Änderungen kurz zusammenfassen und auf die
  ausdrückliche Freigabe des Nutzers warten. Commit und Push nie automatisch
  ausführen. Keine Force-Pushes, Merges oder fremden Änderungen.
