# S004 – Persistente Statistik anzeigen

## Meta

- **State:** Implemented

## User Story

Als Spieler möchte ich sowohl die Statistik der aktuellen Sitzung als auch die
gespeicherte Gesamtstatistik sehen, damit ich meinen Fortschritt nachvollziehen
kann.

## Akzeptanzkriterien

- **AK1:** Beim Programmstart wird die gespeicherte Statistik geladen.
- **AK2:** Nach jeder abgeschlossenen Runde wird der passende Gesamtzähler
  erhöht und gespeichert.
- **AK3:** Der Statistik-Menüpunkt zeigt Sitzungs- und Gesamtstatistik an.
- **AK4:** Die bestehende Sitzungsstatistik bleibt unabhängig von der geladenen
  Gesamtstatistik und startet bei jeder Programmausführung bei null.

## Nicht im Umfang

- Löschen oder Zurücksetzen der Gesamtstatistik
- mehrere Statistikdateien oder Benutzerprofile

## Nachweise

Automatisierte Tests verwenden Marker wie `S004-AK1`.

- **Quality Gate:** `PASS` — `.venv/bin/python scripts/verify.py`.
