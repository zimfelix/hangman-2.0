# Hangman 2.0 – Agentenanweisungen

Dieses Repository ist ein Python-Lernprojekt. Kommuniziere mit dem Nutzer auf
Deutsch; Code, Dateinamen und Python-Bezeichner bleiben idiomatisch englisch.

## Vor Änderungen

1. Lies `harness/rules/core.md`.
2. Wenn `harness/rules/project.md` fehlt oder noch Platzhalter enthält, führe
   einmal die Projektinitialisierung anhand von
   `harness/templates/project-init.md` durch. Ist das Projektprofil ausgefüllt,
   starte Project Init nicht erneut.
3. Lies `harness/rules/project.md`.
4. Lies bei Codeänderungen zusätzlich `harness/rules/code.md`.
5. Lies nur die für den Auftrag relevante Datei unter `specs/`, falls vorhanden.
6. Bei neuem oder verändertem Verhalten: Formuliere zuerst eine kleine Spec nach
   `harness/templates/story.md`. Reine Dokumentations- und interne
   Refactoring-Aufgaben benötigen keine neue Story.

## Arbeitsweise

- Erkläre neue Konzepte kurz und verständlich.
- Bevorzuge kleine, nachvollziehbare Schritte und vermeide verfrühte Abstraktion.
- Verändere Lernübungen nicht ungefragt grundlegend.
- Prüfe Änderungen im kleinstmöglichen sinnvollen Umfang.
- Führe vor dem Story-State `Implemented` das passende Quality Gate aus.
- Wende bei Fehlern die Korrekturschleife aus `harness/rules/core.md` an.
- Ändere Harness-Regeln niemals automatisch wegen eines einzelnen Fehlers.
- Folge nach bestandenem Quality Gate der Git-Delivery-Policy aus
  `harness/rules/project.md`: Änderungen kurz zusammenfassen und auf die
  ausdrückliche Freigabe des Nutzers warten. Commit und Push nie automatisch
  ausführen. Keine Force-Pushes, Merges oder fremden Änderungen.
