# Gemeinsame Code- und Architekturregeln

Gilt für Implementierungen in `src/` und `web/src/`; Bereichsdetails stehen in
`python.md` bzw. `web.md`, projektweite Grenzen in `project.md`.

- Fachliche Spielregeln und Zustandswechsel von Darstellung und Seiteneffekten
  trennen: Regeln dürfen keine Terminaleingabe/-ausgabe, React-Komponenten oder
  Browser-APIs benötigen. Oberfläche und Anwendungseinstieg rufen die Regeln
  auf; Datei- und Browserpersistenz liegen an eigenen Grenzen. So bleiben
  Regeln ohne UI prüfbar.
- JSON-Wortdaten und gespeicherte Zähler an der jeweiligen Lade-/Speichergrenze
  prüfen, bevor sie in die Spiel- oder Statistiklogik gelangen. Fehlerfälle
  nach den betroffenen Specs behandeln, nicht durch neue, unbeauftragte
  Fallbacks oder stillschweigende Datensynchronisation verdecken.
- Für die beiden Implementierungen gelten ihre bestehenden Werkzeuge, keine
  gemeinsame Formatierungsvorgabe: Bereichs-Gates und Testnachweise sind über
  `project.md` und `quality-matrix.md` erreichbar.
