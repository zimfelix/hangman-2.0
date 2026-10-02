# Learning Sandbox

Dieses Projekt dient dem **Lernen und Verstehen**, nicht der Fertigstellung
eines Produkts. Ursprung war ein Hangman Spiel. Erweiterungen:
Experimente liegen unter `sandbox/`. Es gibt keine Website, keinen lokalen
Webserver und keinen Autostart-Dienst.

## Hangman starten – auch im normalen macOS-Terminal

Öffne **Terminal** über Spotlight (`Cmd + Leertaste`, dann „Terminal“).
Wechsle ins Projekt und starte das Spiel:

```bash
cd /Users/felix/Code/python/hangman-2.0
.venv/bin/python src/main.py
```

Das funktioniert genauso im PyCharm-Terminal. Das normale Terminalfenster
kannst du größer ziehen; mit `Cmd + +` lässt sich die Schrift vergrößern.
Im Spiel wählst du Menü und Schwierigkeit über Zahlen und rätst Buchstaben.
Mit Menüpunkt `4` beendest du das Spiel; `Ctrl + C` bricht es direkt ab.

Die Befehle müssen aus dem Projektordner ausgeführt werden, da das Spiel
Wortliste und Statistik relativ zu diesem Ordner lädt. Die virtuelle Umgebung
muss nicht aktiviert werden: `.venv/bin/python` verwendet sie direkt.

### Einmalige Einrichtung

Falls `.venv/` noch nicht vorhanden ist: Python 3.14 oder neuer installieren,
dann im Projektordner ausführen:

```bash
python3.14 -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
```

Das Spiel selbst benötigt nur die Python-Standardbibliothek. Die zusätzlichen
Pakete pytest und Ruff sind Entwicklungswerkzeuge.

## Orientierung

```text
hangman-2.0/
├── AGENTS.md                # Arbeitsweise und kritische Lernbegleitung
├── learning-state.md        # Bisher besprochene Themen
├── src/
│   ├── main.py              # Programmeinstieg und Ablaufsteuerung
│   ├── frontend/ui.py       # Terminalein- und -ausgabe, keine Website
│   └── backend/             # Spiellogik, Wortauswahl und Speicherung
├── tests/                   # Tests für das Terminalspiel
├── data/                    # JSON-Wortliste und Spielstatistik
└── sandbox/weather_api/     # Unabhängiges HTTP-/JSON-Experiment
```

```text
Terminaleingabe → main.py → Spiellogik → Terminalausgabe
                     ↕
                JSON-Dateien
```

`frontend` bezeichnet hier nur die Terminaloberfläche, `backend` die
Python-Logik – keinen Webserver. Das Spiel nutzt `persistence_v1.py` mit
Dictionaries. `persistence_v2.py` bleibt als separate Lernvariante mit einer
Dataclass und eigenen Tests erhalten.

Für kleine Änderungen reichen `AGENTS.md`, diese Übersicht und der relevante
Code samt Tests. Vorschläge und Annahmen sollen kritisch geprüft und wichtige
Begriffe bei Bedarf korrigiert werden.

## Lernpfad: kleine Stufen am Terminalspiel

Die Stufen sind Orientierung, keine bereits umgesetzten Funktionen und kein
Pflichtprogramm. Das Spiel bleibt im Terminal bedienbar.

### 1. Vorhandenes Hangman verstehen

- Eingabe → Logik → Ausgabe im Code verfolgen.
- Klassen, Methoden, Eigenschaften und Spielzustand verstehen.
- Eingaben prüfen, Schwierigkeit und Gewinn/Verlust nachvollziehen.
- JSON-Wortliste und Statistik laden/speichern; Dictionary und Dataclass vergleichen.
- Einzelne Änderungen mit kleinen Tests absichern.

### 2. Eine externe API abrufen

Als vorhandenes Einstiegsbeispiel dient die Wetter-Sandbox:

- Client und Server, Endpoint, GET und URL-Parameter unterscheiden.
- HTTP-Status, Timeout und Verbindungsfehler behandeln.
- JSON-Text in Python-Daten umwandeln und erwartete Felder prüfen.
- Netzwerkzugriffe in Tests simulieren, statt das Internet vorauszusetzen.

```bash
.venv/bin/python sandbox/weather_api/weather.py
.venv/bin/python -m unittest discover -s sandbox/weather_api -v
```

Der Live-Abruf braucht Internet; die Tests nicht. Details stehen in
`sandbox/weather_api/README.md`.

### 3. API-Daten im Terminal-Hangman verwenden

- Optional Wörter von einem geeigneten Dienst abrufen; Anbieter und
  Nutzungsbedingungen vorab klären.
- Abruf, Datenprüfung und Spiellogik getrennt halten.
- Bei Ausfällen weiter die lokale JSON-Wortliste verwenden.
- Erfolgreiche, fehlerhafte und unerwartete Antworten testen.

Eine API zu verwenden erfordert keine eigene Website und keinen eigenen Server.

### 4. Von JSON zu SQLite

- Datei, Tabelle, Zeile, Spalte und Primärschlüssel verstehen.
- Mit Pythons `sqlite3` eine lokale Datenbank öffnen.
- Zunächst einzelne Rundenergebnisse speichern: gewonnen/verloren,
  Schwierigkeit und Zeitpunkt.
- `INSERT` und `SELECT` mit gebundenen Parametern verwenden; keine SQL-Abfragen
  aus Benutzereingaben zusammenbauen.
- Transaktionen, Commit und Rollback kennenlernen.
- Gesamtstatistik aus Rundenergebnissen berechnen und mit einer temporären
  Datenbank testen.

SQLite läuft als Bibliothek im Python-Prozess: kein zusätzlicher Datenbankserver.

## Änderungen prüfen

Im Projektordner:

```bash
.venv/bin/python -m compileall -q src tests sandbox
.venv/bin/python -m ruff check src tests sandbox
.venv/bin/python -m pytest -q
.venv/bin/python -m unittest discover -s sandbox/weather_api -v
```

Die Sandbox bleibt vom Spiel unabhängig. Wortliste und vorhandene
Spielstatistik werden bei Testläufen nicht verändert.
