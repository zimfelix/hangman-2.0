# Projektprofil: Hangman – Terminal und Web

Diese Datei enthält ausschließlich Regeln und Fakten, die für dieses Repository
gelten. Allgemeine Arbeitsregeln stehen in `core.md`.

## Ziel und Lernstruktur

- Dieses Repository enthält zwei getrennte Lernprojekte mit derselben fachlichen
  Domäne: ein Python-Hangman im Terminal und ein lokales Hangman-Webspiel.
- Der Terminalbestand bleibt eigenständig weiterentwickelbar. Die Website ist
  eine separate Umsetzung, nicht sein automatisches Frontend.
- Änderungen an einem Bereich ändern den anderen Bereich nicht. Soll eine
  Terminaländerung in die Website übernommen werden, ist das ein ausdrücklich
  beauftragter manueller Synchronisationsschritt mit eigener oder aktualisierter
  Web-Story und eigenen Nachweisen.
- Einfache, nachvollziehbare Lösungen haben Vorrang vor Frameworks oder
  vorsorglichen Abstraktionen.

## Terminalbereich

- Code: `src/`, Daten: `data/`, Tests: `tests/`, Quality Gate:
  `.venv/bin/python scripts/verify.py`.
- Sprache: Python 3.14; Testframework: pytest; Linter: Ruff.
- `src/main.py` verbindet die Terminaloberfläche in `src/frontend/` mit der
  Spiellogik in `src/backend/`.
- Backend-Code ruft weder `input()` auf noch gibt er sichtbare UI-Texte aus.
- Terminal-Stories liegen in `specs/terminal/`.
- Für Änderungen in diesem Bereich gelten zusätzlich `harness/rules/python.md`.

## Webbereich

- Code und Tests: `web/`; Quality Gate: `cd web && npm run verify`.
- Sprache: TypeScript; React als Single-Page Application (SPA), erstellt mit
  Vite; Laufzeit: Node.js in einer per `web/package.json` dokumentierten Version.
- Persistenz: `localStorage` ausschließlich für lokale Spielstatistik;
  Wortdaten: JSON-Datei im Frontend-Projekt.
- Unit-Tests: Vitest; Browser-Tests: Playwright; Linting und Formatierung:
  ESLint und Prettier. `npm run spec:check` prüft die AK-Abdeckung der
  Web-Stories; `npm run verify` führt diesen Check mit allen weiteren
  Web-Qualitätsprüfungen aus.
- `web/src/main.tsx` startet die Anwendung. `app/` enthält App-Komposition,
  `features/` fachliche Funktionen, `components/` neutrale UI-Teile, `data/`
  Wortdaten und `styles/` globale Design-Tokens.
- Spiellogik bleibt von React-Komponenten und Browser-APIs unabhängig.
  `localStorage`-Zugriffe liegen an einer kleinen Persistenzgrenze.
- Web-Stories liegen in `specs/web/`. Für Änderungen in diesem Bereich gelten
  zusätzlich `harness/rules/code.md`, `harness/rules/web.md` und
  `harness/rules/testing.md`.

## Projektgrenzen

- Die Website läuft lokal; Authentifizierung, Server, Datenbank,
  Mehrbenutzerbetrieb und Cloud-Synchronisation gehören nicht zum Umfang.
- Keine externe Abhängigkeit ohne konkreten Nutzen für eine aktive Spec.
- Für reine Webprototypen darf der Agent passende Texte, Abschnittsreihenfolgen,
  Dummy-Preise und visuelle Detailentscheidungen selbst treffen. Echte Zahlungen,
  Verträge, externe Dienste und irreversible Folgen bleiben Produktentscheidungen
  mit vorheriger Rückfrage.
- Das visuelle Referenzprofil in `harness/rules/web.md` gilt ausschließlich für
  die Website. `https://speakki.de/` ist nur Designinspiration: Marke, Texte,
  Assets, Quellcode und Tracking werden nicht übernommen.

## Spec- und Testnachweis

- Jede neue oder geänderte Nutzfunktion erhält vor der Implementierung eine
  kleine Story nach `harness/templates/story.md` im passenden Spec-Ordner.
- Jedes Akzeptanzkriterium erhält einen Nachweis: passende Unit-Tests,
  browserseitig sichtbare Abläufe mit Playwright oder begründete statische bzw.
  manuelle Evidenz in der Spec.
- Das Quality Gate des geänderten Bereichs ist vor `State: Implemented` grün.
  Berührt eine Änderung beide Bereiche, laufen beide Quality Gates.

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
