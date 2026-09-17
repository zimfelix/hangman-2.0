# S001 – Spielbares Hangman im Terminal

## Meta

- **State:** Implemented

## Ziel

Als Spieler möchte ich Hangman vollständig über ein verständliches deutsches
Terminalmenü spielen, damit ich ohne zusätzliche Oberfläche eine Runde starten
und abschließen kann.

## Beschreibung

Die Anwendung bietet ein Hauptmenü mit Spielstart, Regeln, Sitzungsstatistik und
Beenden. Während einer Runde zeigt sie den aktuellen Galgen, das teilweise
aufgedeckte Wort, bereits geratene Buchstaben und verbleibende Fehlversuche.

## Akzeptanzkriterien

- **AK1:** Beim Programmstart erscheinen eine Begrüßung und ein deutsches Hauptmenü
  mit „Spiel starten“, „Regeln“, „Statistik“ und „Beenden“.
- **AK2:** Eine ungültige Menüauswahl zeigt einen Hinweis und fragt erneut nach.
- **AK3:** Eine laufende Runde zeigt Galgen, Wortzustand, geratene Buchstaben und
  verbleibende Fehlversuche.
- **AK4:** Die Buchstabeneingabe akzeptiert unabhängig von Groß- und Kleinschreibung
  genau einen alphabetischen Buchstaben.
- **AK5:** Ungültige oder bereits geratene Eingaben verbrauchen keinen Fehlversuch
  und erzeugen einen verständlichen Hinweis.
- **AK6:** Ein richtiger Buchstabe wird an allen passenden Positionen aufgedeckt.
- **AK7:** Ein falscher Buchstabe reduziert die verbleibenden Fehlversuche um eins.
- **AK8:** Eine Runde endet mit einer passenden Gewinn- oder Verlustmeldung.
- **AK9:** Die Regeln können aus dem Hauptmenü angezeigt werden.
- **AK10:** Die Statistik zeigt gewonnene und verlorene Runden der aktuellen Sitzung.
- **AK11:** „Beenden“ beendet die Anwendung kontrolliert mit einer Abschiedsmeldung.

## Nicht Teil dieser Story

- dauerhaft gespeicherter Highscore
- Spielerprofile oder Namenseingabe
- grafische Oberfläche
- Auswahl von Schwierigkeitsstufen oder Wortkategorien

## Prüfnachweise

Tests verweisen mit Markern wie `S001-AK1` auf die jeweils abgedeckten
Akzeptanzkriterien.

## State-Regel

Die Story bleibt `Modified`, bis alle Akzeptanzkriterien umgesetzt sind und das
Quality Gate vollständig bestanden ist.
