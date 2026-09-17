# Project Init – Fragen für ein neues Projekt

Einmal vor der ersten Implementierung ausführen. Offene Antworten als offen
markieren statt sie zu erfinden. Für spätere Features wird dieser Katalog nicht
erneut vollständig gelesen.

1. **Ziel und MVP:** Was soll für wen welches Problem lösen? Was muss in Version
   1 funktionieren – und was gehört ausdrücklich nicht dazu?
2. **Technik und Grenzen:** Sprache/Runtime, Plattform, externe Dienste oder
   Daten sowie die wichtigsten Module und ihre Verantwortlichkeiten. Wie werden
   Secrets, Testdaten und irreversible externe Aktionen geschützt?
3. **Arbeits- und Qualitätsweg:** Installation, Start, Tests, Format/Lint und
   der konkrete Quality-Gate-Befehl. Welche Nachweise können automatisiert sein,
   welche müssen statisch oder manuell erfolgen? Ist ein echter Smoke-Test nötig?
4. **Zusammenarbeit und Lieferung:** Erklärniveau, Sprache, Entscheidungen mit
   Rückfrage sowie Commit-/Push-Regel.
5. **Erweiterungscheck:** Braucht das Projekt zusätzliche Regeln für UI/UX,
   API-Verträge, Datenmodell/Migrationen, Secrets, E2E-Tests oder Dokumentation?
   Für jeden benötigten Bereich werden eine kleine projektspezifische Datei und
   ein passender Check im Quality Gate festgelegt.

Aus den Antworten entstehen:

- `AGENTS.md` als kurze Einstiegskarte,
- `project.md` für Ziel, Architektur und Grenzen,
- `code.md`, wenn Sprache oder Werkzeuge eigene Regeln benötigen,
- ein passender Quality-Gate-Befehl bzw. `scripts/verify.*` und
- die erste Spec erst dann, wenn eine konkrete Nutzfunktion umgesetzt wird.
