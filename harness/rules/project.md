# Projektprofil: Hangman Web

Diese Datei enthält ausschließlich Regeln und Fakten, die für dieses Repository
gelten. Allgemeine Arbeitsregeln stehen in `core.md`.

## Ziel und Erfahrungsniveau

- Das Projekt entwickelt schrittweise ein lokal ausführbares, responsives
  Hangman-Webspiel.
- Die bisherige Python-Konsolenversion wird durch die Website ersetzt und nicht
  weiterentwickelt.
- Das Projekt ist ein Lernprojekt; einfache, nachvollziehbare Lösungen haben
  Vorrang vor Frameworks oder vorsorglichen Abstraktionen.
- Das MVP umfasst eine spielbare Runde sowie Statistik in `localStorage`,
  Schwierigkeitsstufen und eine JSON-Wortliste.

## Technik

- Sprache: TypeScript
- Oberfläche: React als Single-Page Application (SPA), erstellt mit Vite
- Laufzeit: Node.js in einer projektlokalen, per `package.json` dokumentierten
  Version
- Persistenz: `localStorage` ausschließlich für lokale Spielstatistik
- Wortdaten: versionierte JSON-Datei im Frontend-Projekt
- Unit-Tests: Vitest
- Browser-Tests: Playwright
- Linting und Formatierung: ESLint und Prettier
- Quality Gate: `npm run verify` im Verzeichnis `web/`; der Befehl wird mit der
  ersten Web-Bootstrap-Story eingerichtet und führt mindestens Linting,
  Type-Check, Unit-Tests und relevante Playwright-Tests aus.

## Architektur

- `web/src/main.tsx` startet die Anwendung.
- `web/src/app/` enthält App-Komposition, Routen und globale Provider.
- `web/src/features/` enthält fachlich getrennte Spielfunktionen, zum Beispiel
  Spielrunde, Statistik und Schwierigkeit.
- `web/src/components/` enthält wiederverwendbare, fachlich neutrale UI-Teile.
- `web/src/styles/` enthält globale Tokens und Basisstile; Komponenten verwenden
  diese Designwerte statt frei gewählter Einzelwerte.
- `web/src/data/` enthält die JSON-Wortliste und ihren Loader.
- Spiellogik bleibt von React-Komponenten, Browser-APIs und sichtbaren Texten
  unabhängig und ist direkt per Unit-Test prüfbar.
- React-Komponenten stellen Zustand und Ergebnisse dar; sie entscheiden keine
  Spielregeln.
- Zugriffe auf `localStorage` werden in einer kleinen, testbaren
  Persistenzgrenze gebündelt.

## Projektgrenzen

- Die Website läuft lokal; Authentifizierung, Server, Datenbank,
  Mehrbenutzerbetrieb und Cloud-Synchronisation gehören nicht zum Umfang.
- Keine externe Abhängigkeit ohne konkreten Nutzen für eine aktive Spec.
- Bestehende Python-Dateien bleiben nur bis zur Web-Bootstrap-Story als
  abzulösender Altbestand (legacy code) im Repository und werden nicht erweitert.
- Das visuelle Referenzprofil steht verbindlich in `harness/rules/web.md` und
  gilt nur für die Website. Sichtbare Spieltexte und zusätzliche
  Spielinteraktionen werden in den jeweiligen Specs festgelegt.
- Die Seite `https://speakki.de/` ist ausschließlich eine Designinspiration.
  Deren Marke, Texte, Assets, Quellcode und Tracking gehören nicht zum Projekt.

## Spec- und Testnachweis

- Jede neue oder geänderte Nutzfunktion erhält vor der Implementierung eine
  kleine Story nach `harness/templates/story.md`.
- Jedes Akzeptanzkriterium erhält einen Nachweis: Unit-Tests für reine
  Spiellogik, Playwright für sichtbare Browser-Abläufe oder begründete statische
  bzw. manuelle Evidenz in der Spec.
- Browser-Tests prüfen nur Akzeptanzkriterien und verwenden zugängliche Locators
  (`getByRole`, `getByLabel`, `getByText`) vor `data-testid`.
- Details stehen in `harness/rules/web.md` und `harness/rules/testing.md`.
- Die Regeln in diesem Profil beschreiben die aktive Webebene. `src/`, `tests/`
  und `scripts/verify.py` sind ausschließlich abzulösender Python-Altbestand,
  bis die Web-Bootstrap-Story ihn entfernt.

## Git-Delivery

- Dieses persönliche Lernprojekt arbeitet review-first: Nach einem bestandenen
  Quality Gate fasst der Agent Änderungen, Tests und offene Punkte kurz zusammen
  und wartet auf die ausdrückliche Freigabe des Nutzers.
- Commit und Push erfolgen nur nach dieser Freigabe. Ohne Freigabe darf der Agent
  weder automatisch committen noch pushen.
- Eine abgeschlossene Story wird gemeinsam mit ihrem Code, ihren Tests und den
  nötigen Konfigurationsänderungen in einem nachvollziehbaren Commit gesichert.
- Commit-Titel beginnen bei Story-Arbeit mit der Spec-ID, z. B. `S006: Bootstrap
  Hangman web app`.
- Kleine Änderungen ohne Spec erhalten einen passenden Präfix wie `fix:`,
  `refactor:` oder `docs:`.
- Bei unklaren, fremden oder nicht zum Auftrag gehörenden Änderungen nicht
  automatisch committen oder pushen; zuerst darauf hinweisen.
