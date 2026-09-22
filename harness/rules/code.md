# TypeScript- und React-Code-Regeln

Diese Regeln gelten ausschließlich für Produktions- und Testcode der künftigen
React-/Vite-Webanwendung unter `web/`. Sie gelten nicht für den abzulösenden
Python-Altbestand. Architektur und Projektgrenzen stehen in `project.md`; Regeln
für die Oberfläche und Tests in `web.md` und `testing.md`.

## Lesbarkeit

- Verwende TypeScript mit aktivem strict mode; `any` ist nicht erlaubt.
- Verwende englische, aussagekräftige Bezeichner und idiomatisches `camelCase`
  für Werte und Funktionen sowie `PascalCase` für React-Komponenten und Typen.
- Bevorzuge einfachen, direkten Code gegenüber cleveren Kurzformen.
- Halte Kontrollflüsse flach und entferne unbenutzten oder auskommentierten Code.
- Produktionscode, Kommentare und technische Texte sind Englisch; die
  Sprache sichtbarer Spieltexte wird in der jeweiligen Spec festgelegt.

## Module und Komponenten

- Ein Modul und eine React-Komponente haben eine klar erkennbare Aufgabe.
- Verwende Funktionen für zustandslose Fachlogik; führe Klassen nur ein, wenn
  zusammengehöriger Zustand und Verhalten dies aktuell vereinfachen.
- Halte Spiellogik als reine Funktionen: Übergib den Spielzustand und Eingaben
  explizit und gib den nächsten Zustand bzw. ein Ergebnis zurück.
- Kapsle Browser-Seiteneffekte wie `localStorage` und Timer außerhalb der
  Spiellogik.
- Wiederverwendbare UI-Teile erhalten klare Props; vermeide globale,
  versteckte Zustände.
- Globale Designwerte liegen in `src/styles/` als CSS-Tokens. Komponenten
  verwenden diese Tokens und enthalten keine willkürlichen Farb-, Abstand- oder
  Schattenwerte.
- Bevorzuge semantische HTML-Elemente und native Controls. Interaktive Icons
  erhalten einen zugänglichen Namen; visuelle Zustände bleiben textlich und für
  assistive Technologien verständlich.
- Führe Abstraktionen erst ein, wenn eine aktive Anforderung sie vereinfacht.

## Fehler und Daten

- Validiere externe Daten, insbesondere die JSON-Wortliste, an ihrer
  Ladegrenze.
- Behandle erwartbare Fehler kontrolliert und zeige in der Oberfläche einen
  verständlichen, handlungsfähigen Zustand statt eines leeren Bereichs.
- Fange keine unbekannten Fehler ohne konkreten Umgang ab und verschweige keine
  Fehler still.
- Prüfe Daten vor dem Speichern in `localStorage`; bei nicht lesbaren oder
  ungültigen gespeicherten Daten wird ein in der Spec definierter sicherer
  Ausgangszustand verwendet.

## Tests und Änderungen

- Unit-Tests prüfen Fachlogik und Persistenzgrenzen ohne Browser.
- Komponenten- und Browser-Tests prüfen beobachtbares Verhalten, keine
  unnötigen Implementierungsdetails.
- Ändere nur Code, der für die aktive Spec oder eine notwendige direkte Folge
  relevant ist.
- Ein Refactoring darf beobachtbares Verhalten nicht unbemerkt verändern.
