# Lernstand – Learning Sandbox

Diese lokale Übersicht bewahrt den bisher besprochenen Lernstoff. Die Themen
wurden angerissen und sollen weiter vertieft werden; das bedeutet nicht, dass
sie bereits sicher beherrscht werden. Neue Erkenntnisse nur auf ausdrücklichen
Wunsch ergänzen und unbestätigte Aussagen als offen markieren.

## Bisher besprochen

- **Python-Grundlagen:** Typen, Built-ins, `isinstance`, `None`, `dict.get`,
  String- und Längenprüfung, veränderliche Collections, `with` und `pathlib`.
- **Fehler und Datenprüfung:** gezielte Exceptions behandeln; fachliche
  Validierung von technischen Fehlern unterscheiden.
- **JSON und Speicherung:** JSON-Werte auf Python-Typen abbilden;
  `dump`/`load` für Dateien gegenüber `dumps`/`loads` für Text;
  Serialisierung und atomisches Speichern über temporäre Datei und `replace()`.
  JSON, CSV und SQLite erfüllen unterschiedliche Aufgaben; SQL ist eine Sprache.
- **Objektorientierung:** Klasse/Objekt, Methode/Attribut, Parameter/Argument,
  Properties, statische und Klassenmethoden, Dataclasses und Vererbung.
- **Tests:** Testebenen, Testzwecke und Qualitätsbereiche unterscheiden.
  Passende Prüfungen nach Änderung und Risiko auswählen, nicht jede Testart
  pauschal einsetzen.
- **Code verstehen:** Einstieg finden, Eingabe → Logik → Ausgabe verfolgen
  und Verantwortlichkeiten, Zustand, Daten und Tests untersuchen.
- **HTTP und APIs:** das Wetterexperiment ergänzt den Lernstoff um GET,
  URL-Parameter, Statuscodes und JSON-Antworten. Das Beispiel ist vorhanden;
  das Verständnis soll daran schrittweise vertieft werden.

## Ergänzungen aus den bisherigen Lernnotizen

Als Wiederholungsstoff übernommen; das Verständnis ist noch zu prüfen.
Die folgenden Präzisierungen korrigieren verkürzte Aussagen der Notizen.

### Python und Datenprüfung

- Built-in-Funktionen (`isinstance`), Typen (`dict`, `int`, `str`, `tuple`)
  und Exceptions (`FileNotFoundError`, `ValueError`, `TypeError`) unterscheiden.
- `isinstance(value, int)` berücksichtigt Unterklassen; `type(value) is int`
  prüft den exakten Typ. Wichtig: `bool` ist eine Unterklasse von `int`.
- `value is None` prüft fehlenden Wert, nicht allgemeine Falschheit.
  `dict.get(key)` liefert ohne passenden Schlüssel standardmäßig `None`.
  `len`, `isalpha`, `isdigit`, `not`, `and` und `or` anhand von Beispielen prüfen.
- `with` nutzt einen Kontextmanager für Aufräumarbeiten; bei Dateien schließt
  er die Datei auch bei Exceptions. `mkdir` erstellt Ordner, `with_suffix`
  liefert einen neuen Pfad mit anderer Endung, benennt aber keine Datei um.
- Technische Fehler gezielt behandeln: fehlende Datei, ungültiges JSON,
  fehlende Berechtigung (`PermissionError`), sonstiger Betriebssystemfehler
  (`OSError`). `TypeError` betrifft unpassende Typen/Operationen oder Aufrufe;
  fachliche Validierung ist eine eigene Prüfung, häufig mit `ValueError`.

### JSON und Speicherformate

- JSON Object → `dict`, Array → `list`, String → `str`, Number → `int` oder
  `float`, Boolean → `bool`, Null → `None`.
- Python → JSON heißt Serialisierung; JSON → Python heißt Deserialisierung.
  `dump`/`load` arbeiten mit Dateiobjekten, `dumps`/`loads` mit Text.
  `dumps` schreibt selbst keine Datei; das `s` steht für String.
- JSON-Text lässt sich bearbeiten, aber für strukturierte Änderungen meist
  erst parsen → Python-Daten ändern → erneut serialisieren. Bei APIs hängt es
  vom HTTP-Werkzeug ab, ob es die JSON-Serialisierung bereits übernimmt.
- JSON passt zu strukturierten Dokumenten und Austausch, CSV zu Tabellen,
  SQLite zu lokaler Speicherung mit Abfragen. SQL ist die Abfragesprache.
- Atomisches Speichern: temporäre Datei schreiben → Zieldatei ersetzen;
  atomarer Austausch ist nicht dasselbe wie garantierte Haltbarkeit bei Stromausfall.

### Objekte, Methoden und Collections

- `game = Hangman("python")`: `Hangman` ist die Klasse, `game` verweist auf
  eine Instanz, `"python"` ist ein Argument. Ein Parameter steht in der
  Funktionsdefinition; ein Argument wird beim Aufruf übergeben.
- Methode = Verhalten, etwa `game.guess("a")`; Attribut = Eigenschaft/Zustand,
  etwa `game.word`. Eine Property wie `game.remaining_attempts` berechnet einen
  Wert beim Zugriff; Aktionen gehören normalerweise in Methoden.
- `@staticmethod` erhält kein automatisches `self` oder `cls`;
  `@classmethod` erhält die Klasse als `cls`, etwa für alternative Konstruktoren.
- `@dataclass` erzeugt unter anderem `__init__`, `__repr__` und `__eq__`.
  Sie passt zu Datenobjekten, ist aber standardmäßig veränderlich – nicht
  automatisch „statisch“. Verhalten und zusätzliche Methoden sind möglich.
- `list`, `dict` und `set` sind veränderlich. Ein `tuple` ist unveränderlich,
  kann aber veränderliche Objekte enthalten. Dictionaries ordnen Schlüssel
  Werten zu; Sets speichern eindeutige Elemente, ohne garantierte Reihenfolge.
- `class Hangman(Game)` zeigt Vererbung. Default-Parameter liefern Standardwerte;
  veränderliche Defaults wie `items=[]` können unerwartet zwischen Aufrufen geteilt werden.

### Tests und frühere Werkzeuge einordnen

- Testebenen: Unit (kleine Funktion/Regel), Komponente (ein Baustein),
  Integration (Zusammenspiel), Contract (vereinbarte Schnittstelle), System
  (gesamte Anwendung) und E2E (vollständiger Nutzerablauf). E2E ist nicht auf
  Browser beschränkt; auch ein Terminalablauf kann durchgängig geprüft werden.
- Qualitätsbereiche: Accessibility, Darstellung, Performance, Security,
  Usability und Compatibility. Testzwecke: Smoke, Regression, Acceptance und
  exploratives Testen. Diese Blickwinkel sind keine austauschbaren Kategorien.
- Spezialformen: API-Anfrage/Antwort, Snapshots, Last unter erwarteter Nutzung,
  Stress jenseits erwarteter Last, Wiederanlauf nach Fehlern sowie Installation
  und Deployment. Ein Snapshot allein beweist keine fachliche Korrektheit.
- Sinnvoller kleiner Prüfrahmen: Logik, relevantes Zusammenspiel, wichtiger
  Nutzerablauf, Regression, statische Prüfungen und Startprüfung. Bedienbarkeit
  passend zur Oberfläche prüfen; keine pauschale Browser- oder Build-Pflicht.
- Frühere Webbegriffe bleiben nur Hintergrundwissen: React für UI, TypeScript
  für Typprüfung, TSX für JSX-Syntax in TypeScript, Vite für Entwicklung/Build,
  Vitest für Tests, Playwright für Browserabläufe, ESLint für Linting und
  Prettier für Formatierung. Daraus entsteht kein neuer Webbereich im Projekt.

## Nächste Wiederholungseinheit

- Für die nächste Sitzung (auf Wunsch morgen): jeweils ein kleines Beispiel
  geben, Felix liest es und sagt voraus, was passiert und warum; erst danach
  Ergebnis, Begründung und mögliche Fehlinterpretationen gemeinsam prüfen.
- Reihenfolge: Typprüfung/`None` → JSON-Datei vs. Text → Objekt/Methode/Property
  → Collections/Default-Parameter → Exceptions/atomisches Speichern → passende Tests.
- Beispiele bevorzugt aus Hangman und der Wetter-Sandbox; nicht sofort neue
  Funktionen bauen. Offene Verständnisfragen und Vertiefungsbedarf erst nach
  der gemeinsamen Prüfung auf ausdrücklichen Wunsch festhalten.

## Lernstil

Kleine nachvollziehbare Schritte, kurze Codebeispiele und Textdiagramme.
Annahmen kritisch prüfen, wichtige Begriffe korrigieren und englische
Standardbegriffe nur gezielt ergänzen. Verständnis geht vor Produktumfang.
