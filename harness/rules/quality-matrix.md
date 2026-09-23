# Test- und Qualitätsmatrix

Diese Matrix ordnet die vereinbarten Testarten den beiden getrennten
Hangman-Bereichen zu. Sie beschreibt Lernziele und angemessene Nachweise, nicht
das Ziel, jede Kategorie künstlich in jedem Teilprojekt einzubauen.

| Test-/Qualitätsart | Terminal (`src/`, `tests/`) | Web (`web/`) | Einordnung |
|---|---|---|---|
| Unit-/Logiktests | pytest für Spielregeln, Eingaben und Wortauswahl | Vitest für Spielregeln, Wortdaten und Statistik | Vorhanden; testet isolierte Regeln/Funktionen. |
| Integrationstests | `test_main.py` verbindet Ablauf und UI mit kontrollierten Abhängigkeiten; Persistence-Tests lesen/schreiben echte temporäre Dateien | Playwright prüft zusammengesetzte App-Abläufe; Statistiktests verbinden Persistenzfunktionen mit Storage-Fake | Vorhanden in passender Projektgröße. Keine separate Integrations-Test-Suite nötig. |
| E2E-/Akzeptanztests | Terminalabläufe werden über UI-/Main-Tests mit simulierten Eingaben geprüft; kein Browser-E2E | Playwright bedient die gebaute Website über den Browser | Web-E2E vorhanden; Terminal-Browser-E2E nicht anwendbar. |
| Regression | Der vollständige pytest-Satz läuft bei jedem Terminal-Gate | Vollständige Vitest- und Playwright-Suite läuft bei jedem Web-Gate | Vorhanden als Wiederholung der Bereichssuiten. |
| Statische Prüfungen | Ruff; Syntax via `compileall` | Prettier, ESLint, TypeScript strict typecheck und AK-Spec-Coverage | Vorhanden. |
| Build-/Startprüfung | Python-Syntaxprüfung plus Terminalablauf-Tests; kein separater Paketbuild | `vite build`, danach Playwright `webServer` mit `vite preview` gegen das gebaute Artefakt | Web prüft gebauten Produktionsstand beim tatsächlichen Start. |
| Basis-Accessibility | Nicht anwendbar für textbasiertes Terminal; Eingabehinweise werden durch pytest geprüft | axe-core/Playwright prüft WCAG-A-Kontrast-/Semantikregeln; E2E prüft mobile Navigation und Überlauf | Automatisierte Basisprüfung vorhanden; manuelle Screenreader-/Tastaturprüfung bleibt bei Bedarf ergänzend. |

## Ausführung

- Terminal-Gate: `.venv/bin/python scripts/verify.py`
- Web-Gate: `cd web && npm run verify`
- Web-Unit-Tests einzeln: `cd web && npm test`
- Web-E2E samt Produktionsbuild: `cd web && npm run test:e2e`

## Grenzen

- Ein grüner axe-core-Scan beweist keine vollständige Accessibility-Konformität.
  Er deckt nur die automatisierbaren Regeln im geprüften Zustand ab.
- Keine API-/Datenbank-Integrationstests: Die Webanwendung hat weder Backend
  noch externe Schnittstelle.
- Deployment, Monitoring und Laufzeitbeobachtung sind nicht Teil des lokalen
  Projekts. Wenn Deployment hinzukommt, braucht es eine eigene Spec und passende
  Betriebschecks.
- Sicherheitsscans oder Penetrationstests sind für die lokale SPA ohne Server,
  Konto oder externe Eingaben aktuell nicht eingerichtet. Bei neuen
  Integrationen muss der Umfang neu bewertet werden.
