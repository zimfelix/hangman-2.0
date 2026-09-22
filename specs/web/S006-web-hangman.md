# S006 – Lokales Hangman-Webspiel

## Meta

- **State:** Implemented

## User Story

Als Spieler möchte ich Hangman lokal im Browser spielen, damit ich Runden auf
Handy und Desktop mit Schwierkeitsstufen und eigener Statistik spielen kann.

## Beschreibung

Die React-Webanwendung ist eine eigenständige Browser-Umsetzung neben der
Terminalanwendung. Vor einer Runde wählt der Spieler leicht, normal oder schwer;
die Runde zeigt Wortzustand, Galgenfortschritt, verbleibende Fehlversuche und eine
bedienbare Buchstabentastatur. Die Wortliste kommt aus einer JSON-Datei. Die
Statistik der aktuellen Browser-Sitzung bleibt flüchtig, die Gesamtstatistik wird
im `localStorage` gespeichert und kann in der Oberfläche angezeigt werden.

## Akzeptanzkriterien

- **AK1:** `web/` enthält eine lokal startbare React-/Vite-/TypeScript-Anwendung
  mit einem `npm run verify`-Quality-Gate.
- **AK2:** Vor einer neuen Runde kann der Spieler leicht mit 8, normal mit 6 oder
  schwer mit 4 erlaubten Fehlversuchen auswählen.
- **AK3:** Eine gestartete Runde zeigt den verdeckten Wortzustand, einen
  zunehmenden Hangman-Fortschritt, verbleibende Fehlversuche und bereits geratene
  Buchstaben.
- **AK4:** Die Buchstabentastatur akzeptiert genau einen noch nicht geratenen
  alphabetischen Buchstaben; ein richtiger Buchstabe wird an allen passenden
  Positionen aufgedeckt und ein falscher reduziert die Fehlversuche um eins.
- **AK5:** Ungültige oder bereits geratene Eingaben verändern weder Wortzustand
  noch verbleibende Fehlversuche.
- **AK6:** Eine Runde zeigt nach dem letzten fehlenden Buchstaben eine
  Gewinnmeldung oder nach dem letzten erlaubten Fehlversuch eine Verlustmeldung
  mit dem Lösungswort und bietet eine neue Runde an.
- **AK7:** Die Wortliste wird aus einer JSON-Datei geladen; fehlende, ungültige
  oder nicht spielbare Wortdaten erzeugen einen verständlichen Fehlerzustand.
- **AK8:** Die Statistikansicht zeigt getrennt gewonnene und verlorene Runden
  der aktuellen Browser-Sitzung und aller gespeicherten Runden.
- **AK9:** Beim Laden werden gültige Gesamtstatistiken aus `localStorage`
  übernommen; nach Gewinn oder Verlust wird der passende Gesamtzähler
  gespeichert, während die Sitzungsstatistik bei einem Neuladen bei null beginnt.
- **AK10:** Die Spieloberfläche ist responsive, per Tastatur bedienbar und folgt
  dem Referenzprofil aus `harness/rules/web.md`.

## Nicht im Umfang

- Server, Anmeldung, Cloud-Synchronisation oder mehrere Spielerprofile
- Bearbeiten der Wortliste im Browser
- Übernahme von SpeakKI-Texten, Marke, Assets oder Quellcode

## Nachweise

Automatisierte Tests verwenden Marker wie `S006-AK1`.

- **Quality Gate:** `PASS` — `cd web && npm run verify`.
