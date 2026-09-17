# Core Rules – minimalistischer Agentic Harness

## Zweck und Grenze

Diese Datei enthält nur den universellen Arbeitsablauf. Architektur, Technik,
Code-Stil, UI und konkrete Befehle gehören in die projektspezifischen Dateien
`project.md`, `code.md` und in den Quality-Gate-Befehl.

## Ablauf

1. Lies `AGENTS.md`, die für die Aufgabe relevante Projektregel und bei einer
   Änderung die betroffene Spec. Lies keine Ordner auf Vorrat.
2. Neue oder geänderte Nutzfunktion: Erstelle oder aktualisiere **vor dem Code**
   eine kleine Spec. Reine Dokumentation, Formatierung oder eindeutig
   verhaltensgleiche Umstrukturierung braucht keine Spec.
3. Eine Spec enthält Ziel, klar abgegrenzten Umfang, atomare und beobachtbare
   Akzeptanzkriterien (AK) sowie das Nicht-Ziel.
4. Leite für jedes relevante AK einen Nachweis ab. Automatisierte Tests sind der
   Standard und tragen den Marker `SXXX-AKX`. Nur wenn Automatisierung nicht
   sinnvoll ist, dokumentiere eine bestandene statische oder manuelle Prüfung
   direkt in der Spec. Implementiere danach die kleinste zusammenhängende Änderung.
5. Nutze während der Arbeit den kleinsten passenden Check. Vor Abschluss läuft
   immer das projektspezifische Quality Gate.
6. Schlägt es fehl: Ursache als **Code**, **Test** oder **Spec** einordnen,
   gezielt korrigieren und das Gate wiederholen.

## Status der Spec

- **Modified:** Die Spec ist neu/geändert oder ihre Erfüllung ist noch nicht
  nachgewiesen.
- **Implemented:** Alle AK sind nachweisbar erfüllt und das erforderliche
  Quality Gate ist grün.

Die Spec ist die Quelle für den gewünschten Funktionsumfang, nicht ein
Prompt-Protokoll. Ein Fehler in einer einzelnen Implementierung ist kein Grund,
den universellen Harness automatisch zu ändern. Regeländerungen erfolgen nur
bewusst, wenn ein wiederholtes, projektübergreifendes Muster vorliegt.

## Effizienz und Lieferung

- Halte Specs, Diffs und Antworten kurz; keine großen Logs oder unnötigen
  Kontext laden.
- Prüfe nur, was die Änderung berührt; der Abschlusscheck bleibt vollständig
  genug für das Projekt.
- Verhaltensänderungen liefern Spec, Nachweis und Code gemeinsam. Die
  Projektrichtlinie bestimmt Commit und Push. Nie fremde Änderungen,
  ungeprüfte Änderungen oder Force-Pushes ausliefern.
