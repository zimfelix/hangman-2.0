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
├── harness/                 # Bisheriger Harness (für V2-Arbeit inaktiv)
└── harness-v2/              # Aktiver V2-Projektinit und Gate-Runner
```

## Harness V2 und Arbeitsweise

Für V2-Arbeit gilt der Einstieg in `harness-v2/AGENTS.md` und das Projektprofil
in `harness-v2/harness/rules/project-specific/project.md`. Der bisherige
`harness/` bleibt erhalten, ist dafür aber nicht die Regelquelle. Bestehende
Feature-Stories in `specs/terminal/` und `specs/web/` bleiben Anforderungen;
V2-`specs/` dokumentiert ausschließlich die Entwicklung des Starter-Kits.
Änderungen am Terminal verändern die Website nicht automatisch und umgekehrt.
Eine Übernahme zwischen Bereichen braucht eigenen Auftrag, passende Story und
Bereichs-Gate. Die Web-Designregeln in
`harness-v2/harness/rules/project-specific/web.md` gelten nur für `web/`.

Aggregiertes V2-Gate (führt Terminal, Web, V2-Unit-Tests und V2-Ruff einmal aus):

```bash
.venv/bin/python harness-v2/scripts/verify.py
```

### Zuständigkeiten – eine Quelle pro Regel

| Ort | Aufgabe |
|---|---|
| `harness-v2/AGENTS.md` | V2-Einstieg und Verweise. |
| `harness-v2/harness/rules/universal/core.md` | Universeller Ablauf; wann Idea, Spec und Gate nötig sind. |
| `harness-v2/harness/rules/universal/ideas.md`, `quality.md` | Klärung bzw. Auswahl von Nachweisen. |
| `harness-v2/harness/templates/idea.md`, `story.md`, `project-init.md` | Artefaktformen und einmalige Projektinit. |
| `harness-v2/harness/rules/project-specific/project.md` | Projektziel, Grenzen, Architektur und Gate-Einstieg. |
| `harness-v2/harness/rules/project-specific/python.md`, `web.md`, `testing.md` | Bereichs- und Testkonventionen nur bei Bedarf. `code.md` bleibt `Pending Project Init`. |
| `harness-v2/harness/rules/project-specific/quality-matrix.md` | Zuordnung der Bereichsnachweise ohne zweite Befehlsquelle. |
| `harness-v2/harness/rules/project-specific/quality-gate.json`, `harness-v2/scripts/verify.py` | Ausführbare Gate-Checks und Runner. |
| `specs/`, `harness-v2/ideas/`, `harness-v2/learning-state.md` | Anforderungen, offene Vorhaben und manuell gesammeltes Wissen – keine Regeln. |
