# Python-Code-Regeln für den Terminalbereich

Diese Regeln gelten ausschließlich für Produktions- und Testcode in `src/`,
`tests/` und `scripts/`. Architektur und Projektgrenzen stehen in `project.md`.

## Lesbarkeit

- Halte dich an PEP 8.
- Verwende englische, aussagekräftige Python-Bezeichner.
- Bevorzuge einfachen, direkten Code gegenüber cleveren Kurzformen.
- Halte Kontrollflüsse möglichst flach und verwende frühe Rückgaben, wenn sie die
  Lesbarkeit verbessern.
- Entferne unbenutzten und auskommentierten Code.

## Funktionen und Klassen

- Eine Funktion erfüllt eine klar erkennbare Aufgabe.
- Übergib benötigte Werte als Parameter und gib Ergebnisse mit `return` zurück.
- Vermeide versteckte globale Zustände.
- Verwende eine Klasse, wenn zusammengehöriger Zustand und Verhalten gemeinsam
  verwaltet werden; verwende keine Klasse nur als Sammlung von Funktionen.
- Führe Abstraktionen erst ein, wenn sie eine aktuelle Anforderung vereinfachen.

## Grenzen und Testbarkeit

- Halte `input()` und sichtbare `print()`-Ausgaben im Frontend.
- Halte Spielregeln und Spielzustand unabhängig von der Terminaloberfläche.
- Fachlogik soll mit direkten Funktions- oder Methodenaufrufen testbar sein.
- Tests prüfen beobachtbares Verhalten und keine unnötigen Implementierungsdetails.

## Fehler und Eingaben

- Behandle erwartbare ungültige Eingaben kontrolliert.
- Fange keine allgemeinen Exceptions ohne konkreten Umgang mit dem Fehler ab.
- Verwende eindeutige Rückgabewerte oder gezielte Exceptions statt stiller Fehler.

## Kommentare und Dokumentation

- Kommentare erklären das Warum, nicht offensichtliche Codezeilen.
- Docstrings sind für Module sowie für nicht selbsterklärende öffentliche
  Funktionen und Klassen sinnvoll.
- Produktionscode, Kommentare und Docstrings verwenden Englisch; die Sprache der
  Spieloberfläche wird in den jeweiligen Specs festgelegt.

## Änderungsumfang

- Ändere nur Code, der für die aktive Spec oder eine notwendige direkte Folge
  relevant ist.
- Ein Refactoring darf das beobachtbare Verhalten nicht unbemerkt verändern.
