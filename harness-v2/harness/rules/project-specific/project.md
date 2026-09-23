# Projektprofil: Hangman

## Ziel und Grenzen

Zwei lokal ausführbare Hangman-Lernbereiche teilen die Spielidee, aber nicht Code,
Wortdaten, Statistiken oder Release-Schritte: das Python-Terminalspiel (`src/`,
`tests/`, `data/`) und die eigenständige React-Website (`web/`). Nutzer spielen
Runden mit leicht (8), normal (6) oder schwer (4) erlaubten Fehlversuchen und
sehen Sitzungs- und Gesamtstatistiken. Die Website ergänzt eine scrollbare,
mobile Landingpage mit rein prototypischen Preisen. Für den Webbereich gibt es
keinen Server, keine Anmeldung, Zahlung, Datenbank oder Cloud-Synchronisation.
Eine Übernahme zwischen Terminal und Web ist nur ein ausdrücklich beauftragter
Schritt mit eigener Spec und Nachweisen; niemals automatisch mitändern.

## Architektur, Daten und Betrieb

- Terminal: `src/main.py` verbindet `src/frontend/ui.py` (deutsche Ein- und
  Ausgabe) mit `src/backend/` (Spielregeln, Wortauswahl, JSON-Persistenz).
  `data/words.json` enthält die Wortliste; `data/statistics.json` enthält
  Gesamtzähler. Sitzungszähler leben nur während des Prozesses. Die aktive
  Implementierung verwendet `persistence_v1.py`; `persistence_v2.py` ist ein
  separates, getestetes Lernbeispiel, nicht die Laufzeitpersistenz.
- Web: `web/src/main.tsx` startet die React-/Vite-/TypeScript-SPA.
  `web/src/app/App.tsx` komponiert Spiel und Landingpage, `features/game/`
  kapselt Spielregeln, `features/statistics/` die Persistenzfunktionen,
  `data/words.json` die eigene Wortliste, `styles/global.css` das Design.
  Die Wortdaten werden im Bundle geladen; nur die Gesamtstatistik wird im
  Browser-`localStorage` gespeichert. Sitzungsstatistik lebt im React-State.
  Es gibt keine Server-API.
- Terminal: Python >=3.14 (`pyproject.toml`), Start vom Repository-Root mit
  `.venv/bin/python src/main.py`. Tests verwenden temporäre Statistikdateien.
- Web: Node/npm mit lokal installierten Abhängigkeiten (`cd web && npm ci`),
  Start mit `npm --prefix web run dev`; Produktionsbuild via
  `npm --prefix web run build`. `web/package.json` legt Paketversionen fest,
  keine feste Node-Version; verwendete Laufzeit vor Ort auf Kompatibilität
  prüfen. Browserdaten bleiben im jeweiligen Browserprofil; kein Deployment
  oder Recovery-Dienst ist eingerichtet.

## Specs, Qualität und Lieferung

- Bestehende Anforderungen: `specs/terminal/` (S001–S005) und
  `specs/web/` (S006–S007).
  Neue Nutzerfunktionen erhalten eine kleine Spec im passenden Ordner nach
  `harness-v2/harness/templates/story.md`; die V2-Starter-Kit-Specs sind
  keine Hangman-Anforderungen. Gemeinsame Codegrenzen stehen in `code.md`,
  passende Nachweise und Grenzen in `quality-matrix.md` und `testing.md`.
- Bereichs-Gates vom Repository-Root: `.venv/bin/python scripts/verify.py`
  (Terminal: Syntax, Ruff, pytest, AK-Marker) und
  `npm --prefix web run verify` (Web: Prettier, ESLint, TypeScript, Vitest,
  AK-Marker, Build und Playwright/axe). Bei Änderungen an beiden Bereichen
  beide ausführen. V2 selbst: Unit-Tests und Ruff; das aggregierte V2-Gate
  `.venv/bin/python harness-v2/scripts/verify.py`
  startet alle drei Bereiche über `quality-gate.json` genau einmal und
  ersetzt deren separaten Aufruf im selben Durchgang. Python- und
  npm-Abhängigkeiten sowie Playwright-Chromium müssen installiert sein.
- Offene Bestandsbefunde: Der Web-Statistikdialog übernimmt den Fokus beim
  Öffnen nicht und schließt nicht mit Escape; der aktuelle E2E-/axe-Lauf
  entdeckt das nicht. Im Terminal nennt `show_rules()` unabhängig von der
  gewählten Stufe immer sechs Fehlversuche. Diese Befunde erfordern gezielte
  Code- und Nachweisprüfung, keine Ausnahme der Qualitätsregeln.
- Zusammenarbeit auf Deutsch, Code und Bezeichner idiomatisch englisch;
  kleine, nachvollziehbare Änderungen bevorzugen. Offene Produktfragen,
  echte Zahlungen oder externe Dienste vorab klären. Designreferenzen nur
  als Prinzipien verwenden; keine fremden Marken, Texte, Assets, Quellen
  oder Tracking kopieren.
- Review-first: Nach grünem Gate Änderungen und offene Punkte zusammenfassen
  und auf ausdrückliche Freigabe warten. Kein automatischer Commit oder Push,
  kein Force-Push und keine fremden Änderungen ausliefern. Story-Commits
  beginnen mit der Spec-ID; für Änderungen ohne Story ein passender Präfix
  wie `docs:`. Terminal und Web nicht ungefragt gemeinsam ausliefern.
