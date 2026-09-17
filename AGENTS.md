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

## Modellrouting

- Standard für diese Projektarbeit ist `luna_worker` mit Modell
  `gpt-5.6-luna` und Reasoning `medium`.
- Für kleine, klar abgegrenzte Aufgaben (Dokumentation, eine mechanische
  Ein-Datei-Änderung, einfache Tests) keinen zusätzlichen Agenten starten.
- `terra_worker` nur bei normalen mehrteiligen Implementierungen, neuen Tests
  oder begrenzter Fehlersuche delegieren.
- `sol_worker` nur bei Architekturentscheidungen, externen APIs, unklaren
  Fehlerketten oder wiederholtem Quality-Gate-Fehlschlag delegieren.
- Nur den für die Aufgabe nötigen Kontext übergeben. Nach der Delegation bleibt
  die Prüfung im aktuellen Quality Gate bestehen.
- Diese Profile wählen ein Modell für delegierte Agenten; sie wechseln nicht
  nachträglich das bereits laufende Hauptmodell einer Sitzung. Eine bewusste
  manuelle Modellwahl des Nutzers hat Vorrang.

## Arbeitsweise

- Erkläre neue Konzepte kurz und verständlich.
- Bevorzuge kleine, nachvollziehbare Schritte und vermeide verfrühte Abstraktion.
- Verändere Lernübungen nicht ungefragt grundlegend.
- Prüfe Änderungen im kleinstmöglichen sinnvollen Umfang.
- Führe vor dem Story-State `Implemented` das passende Quality Gate aus.
- Wende bei Fehlern die Korrekturschleife aus `harness/rules/core.md` an.
- Ändere Harness-Regeln niemals automatisch wegen eines einzelnen Fehlers.
- Folge nach bestandenem Quality Gate der Git-Delivery-Policy aus
  `harness/rules/project.md`: nur den zusammenhängenden Arbeitsstand committen
  und anschließend pushen. Keine Force-Pushes, Merges oder fremden Änderungen.
