# Testregeln für die Webanwendung

Diese Regeln ergänzen `core.md` für Vitest und Playwright.

## Allgemein

- Tests leiten sich aus Akzeptanzkriterien ab. Jeder Test trägt den Marker
  `SXXX-AKX` in seinem Namen oder Kommentar.
- Teste beobachtbares Verhalten statt Komponentenstruktur, Hook-Interna oder
  CSS-Klassen.
- Jeder Test ist unabhängig und in beliebiger Reihenfolge ausführbar.
- Neue Tests müssen vor dem Quality Gate mindestens einmal isoliert laufen.

## Unit-Tests mit Vitest

- Reine Spiellogik, JSON-Validierung und `localStorage`-Persistenz werden mit
  Vitest getestet.
- Tests verwenden kleine, explizite Eingabedaten und decken gültige sowie
  erwartbar ungültige Fälle ab.
- Zeit, Zufall und Browser-Speicher werden kontrolliert bzw. ersetzt, damit
  Tests deterministisch bleiben.

## Browser-Tests mit Playwright

- Playwright prüft sichtbare, über den Browser bedienbare Akzeptanzkriterien.
- Pro zusammenhängendem fachlichem Ablauf darf ein Test mehrere passende,
  atomare Kriterien derselben Story abdecken; jede Prüfung bleibt einzeln
  erkennbar.
- Verwende Locators in dieser Reihenfolge: `getByRole`, `getByLabel`,
  `getByText`, `getByTestId`. Selektoren auf CSS-Klassen, DOM-Struktur, XPath
  und `nth-child` sind verboten.
- Verwende web-first Assertions und keine festen Wartezeiten.
- Tests dürfen `localStorage` nur innerhalb ihres frischen Browser-Kontexts
  vorbereiten; sie teilen keinen Browser- oder Speicherzustand.
- Chromium ist der Standardbrowser. Weitere Browser kommen nur mit konkreter
  Story oder Fehlernachweis hinzu.

## Quality Gate

- `npm run verify` bündelt Formatprüfung, Linting, Type-Check, Unit-Tests,
  automatische Web-Spec-Abdeckung, Build und Playwright-Tests.
- `npm run spec:check` prüft für jede Story unter `specs/web/` einen gültigen
  State und für jedes AK einen Testmarker oder einen bestandenen statischen bzw.
  manuellen Nachweis.
- Ein fehlgeschlagener Check wird als Code-, Test- oder Spec-Problem eingeordnet,
  gezielt korrigiert und vollständig wiederholt.
