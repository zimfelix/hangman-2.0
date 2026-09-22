# Hangman Web

Ein lokal ausführbares, responsives Hangman-Webspiel. Die Website ersetzt die
frühere Python-Konsolenversion schrittweise.

## Geplanter Funktionsumfang

- Hangman-Runden im Browser
- Schwierigkeitsstufen und JSON-Wortliste
- Lokale Spielstatistik mit `localStorage`
- Bedienung für schmale Handy- und größere Bildschirmansichten
- Ruhige, helle Oberfläche mit blauem Akzent, definiert in
  `harness/rules/web.md`

Konkretes Verhalten wird vor der Implementierung in `specs/` beschrieben.

## Ziel-Technik

- React
- Vite
- TypeScript mit strict mode
- Vitest für Fachlogik und Persistenz
- Playwright für Browser-Abläufe
- ESLint und Prettier für Codequalität

Es wird kein Server, keine Datenbank, keine Anmeldung und keine Cloud-Persistenz
verwendet.

## Zielstruktur

```text
hangman/
├── web/                     # React-/Vite-Anwendung (folgt mit S006)
│   └── src/
│       ├── app/             # App-Komposition
│       ├── components/      # Wiederverwendbare UI-Teile
│       ├── data/            # JSON-Wortliste und Loader
│       └── features/        # Spiel, Statistik, Schwierigkeit
├── specs/                   # Stories und Akzeptanzkriterien
├── harness/                 # Arbeits-, Web- und Testregeln
│   ├── rules/
│   └── templates/
├── src/                     # Abzulösende Python-Konsolenversion
└── tests/                   # Abzulösende Python-Tests
```

## Geplante lokale Ausführung

Nach der Web-Bootstrap-Story:

```bash
cd web
npm install
npm run dev
```

## Qualität

Nach der Web-Bootstrap-Story prüft das zentrale Quality Gate:

```bash
cd web
npm run verify
```

Es bündelt Linting, Type-Check, Unit-Tests und relevante Browser-Tests. Jeder
Test ist auf Akzeptanzkriterien einer Story zurückführbar.

## Harness

- `harness/rules/core.md`: universeller, minimalistischer Ablauf
- `harness/rules/project.md`: Ziel, Technik, Architektur und Lieferregeln
- `harness/rules/code.md`: TypeScript- und React-Konventionen
- `harness/rules/web.md`: Web-Designprofil, mobile UI und Accessibility
- `harness/rules/testing.md`: Vitest- und Playwright-Konventionen
- `harness/templates/story.md`: Vorlage für kleine Anforderungen
