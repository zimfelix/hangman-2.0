# Hangman

Dieses Repository enthält zwei getrennte, lokal ausführbare Hangman-Lernprojekte.
Sie teilen fachliche Ideen, werden aber bewusst nicht automatisch synchronisiert.

## Terminalspiel

Das ursprüngliche Python-Konsolenspiel bleibt unter `src/` erhalten.

```bash
.venv/bin/python src/main.py
```

Qualität prüfen:

```bash
.venv/bin/python scripts/verify.py
```

## Webspiel

Die eigenständige React-/Vite-/TypeScript-Umsetzung liegt unter `web/`. Sie
enthält JSON-Wortdaten, Schwierigkeitsstufen sowie Statistik in `localStorage`.

```bash
cd web
npm install
npm run dev
```

Qualität prüfen:

```bash
cd web
npm run verify
```

## Struktur

```text
hangman/
├── src/                     # Python-Terminalanwendung
├── tests/                   # pytest-Tests für das Terminalspiel
├── data/                    # Terminal-Wortliste und Statistikdatei
├── scripts/                 # Python-Quality-Gate
├── web/                     # React-/Vite-Webanwendung samt eigener Tests
├── specs/
│   ├── terminal/            # Stories des Terminalspiels
│   └── web/                 # Stories der Website
└── harness/                 # Gemeinsamer minimalistischer Harness
```

## Arbeitsweise

- Eine Terminaländerung verändert die Website nicht automatisch.
- Eine gewünschte Website-Übernahme ist ein manueller Schritt mit eigener
  Web-Story, Tests und dem Web-Quality-Gate.
- Umgekehrt verändert eine Website-Änderung das Terminalspiel nicht.
- Die Web-Designregeln in `harness/rules/web.md` gelten nur unter `web/`.
