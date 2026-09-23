# S007 – Scrollbare Hangman-Landingpage

## Meta

- **State:** Implemented

## User Story

Als Besucher möchte ich neben dem Spiel eine informative, professionell wirkende
Hangman-Website sehen, damit ich Spiel, Nutzen, Statistik und die vorgesehenen
Pakete schnell einordnen kann.

## Beschreibung

Die bestehende Spieloberfläche wird in eine scrollbare Landingpage eingebettet.
Ein Header verlinkt auf Spiel, Nutzen, Preise und Über Hangman. Inhaltliche
Abschnitte erklären Hangman als Gedächtnis- und Wortspiel, zeigen statische
Preispakete und stellen das Projekt vor. Der Footer verlinkt auf den
Über-Hangman-Abschnitt und öffnet die vorhandene Statistikansicht. Preise sind
reine Designprototypen und lösen keinen Kauf aus.

## Akzeptanzkriterien

- **AK1:** Der Header enthält Links zu Spiel, Nutzen, Preise und Über Hangman
  sowie eine Aktion zum Öffnen der Statistik.
- **AK2:** Der obere Bereich erklärt Hangman als Wort- und Gedächtnistraining
  und führt mit einer Aktion zum Spielbereich.
- **AK3:** Ein Nutzenabschnitt stellt drei verständliche Vorteile des Spiels dar.
- **AK4:** Ein Preisabschnitt zeigt die statischen Pakete Kostenlos, Plus für
  4,90 € pro Monat und Pro für 9,90 € pro Monat.
- **AK5:** Die Paketaktionen führen zum Spielbereich und lösen weder einen Kauf
  noch eine Registrierung aus.
- **AK6:** Ein Über-Hangman-Abschnitt erklärt das lokale Lernprojekt und der
  Footer verlinkt auf diesen Abschnitt sowie auf die Statistikansicht.
- **AK7:** Die Seite bleibt auf schmalen und breiten Ansichten ohne horizontales
  Scrollen bedienbar, ist grundlegend barrierearm (Tastatur, zugängliche Namen,
  Fokus und Kontrast) und behält das bestehende Spielverhalten bei.

## Nicht im Umfang

- Echte Zahlung, Registrierung, Tarifverwaltung oder Preisberechnung
- Zusagen zu medizinischen oder wissenschaftlich belegten Gedächtniseffekten
- Automatische Synchronisation mit dem Python-Terminalspiel

## Nachweise

Automatisierte Tests verwenden Marker wie `S007-AK1`.

- **Quality Gate:** `PASS` — `cd web && npm run verify`.
