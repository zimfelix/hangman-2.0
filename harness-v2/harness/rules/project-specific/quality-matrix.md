# Qualitätsmatrix: getrennte Bereiche

Die Gates und ihr Einstieg stehen in `project.md`, ihre Ausführung in
`quality-gate.json` bzw. den bestehenden Bereichsskripten. Die Auswahlprinzipien
stehen in `../universal/quality.md`.

| Risiko / Nachweis | Terminal | Web | Grenze |
|---|---|---|---|
| Regeln und Daten | pytest: Spiel, Eingaben, Wortauswahl, JSON-Persistenz | Vitest: Spiellogik, JSON-Wortliste, Storage-Fake | Kein geteilter Datenvertrag zwischen den Bereichen. |
| Zusammenspiel / Nutzerweg | pytest mit simulierten Eingaben und `main.py` | Playwright/Chromium gegen Produktionsbuild und `vite preview` | Terminal braucht keinen Browser; Web hat keine API/DB. |
| Regression / statisch | Volle pytest-Suite, Ruff, `compileall`, AK-Marker | Vitest, E2E, Prettier, ESLint, strict TypeScript, AK-Marker, Vite-Build | Marker sind keine inhaltliche Testprüfung. |
| Accessibility | Verständliche Terminalhinweise in UI-Tests | Playwright: mobile Breite, zugängliche Namen und axe-core-Scan | Tastatur/Fokus und Screenreader sind dadurch nicht vollständig nachgewiesen; bei Interaktionsänderungen gezielt manuell prüfen. |
| Harness V2 | V2-Runner-Unit-Tests und Ruff | Nicht als Web-Test duplizieren | V2-Gate orchestriert Bereichsprüfungen, ruft sich nicht selbst auf. |

Kein gesonderter Last-, API-, Datenbank-, Deployment- oder Security-Scan ohne
passenden konkreten Befund bzw. neue Schnittstelle. Bei beiden betroffenen
Bereichen beide Gates ausführen; keine automatische Synchronisation.
