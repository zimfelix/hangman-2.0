# Erste Web-API: Wetter für Kronach

Diese Sandbox ist unabhängig von Hangman. Sie benötigt nur Python 3.14,
Internetzugang und keinen API-Schlüssel. Der Abruf übermittelt die festgelegten
Koordinaten von Kronach an Open-Meteo, keine persönlichen Kontodaten.

## Start im Repository-Root

```bash
python3 sandbox/weather_api/weather.py
```

## Was passiert?

```text
Python-Client
    │ GET an eine Adresse mit Parametern
    ▼
Open-Meteo-Server
    │ HTTP-Antwort mit Status und JSON-Text
    ▼
json.loads(json_text)
    │ Python-dict mit verschachtelten dicts
    ▼
data["current"]["temperature_2m"]
    │
    ▼
Temperatur im Terminal
```

- **Endpoint:** `https://api.open-meteo.com/v1/forecast` — die angesprochene API-Adresse.
- **Parameter:** Angaben hinter `?`, getrennt durch `&`: Ort, gewünschte Daten und Zeitzone.
- **GET:** HTTP-Methode zum Abrufen von Daten.
- **200:** HTTP-Status für eine erfolgreiche Anfrage.
- **JSON:** Datenformat der Antwort, nicht der Transport.
- **`urlopen`:** sendet die HTTP-Anfrage und empfängt die Antwort.
- **`json.loads`:** wandelt JSON-Text in Python-Daten um.

Die Temperatur stammt aus den aktuellen Wetterdaten des Anbieters (modellbasiert),
nicht zwingend aus einer Messstation direkt in Kronach. Die Koordinaten sind
näherungsweise.

## Kleine Übung

1. Starte das Beispiel und finde die Temperatur zuerst im JSON-Text.
2. Suche im Python-Code die Zeile, die genau diesen Wert ausliest.
3. Ändere in `PARAMETERS` die Zeitzone auf `UTC` und beobachte den Zeitwert.
   Stelle anschließend wieder `Europe/Berlin` ein.

Dokumentation: https://open-meteo.com/en/docs
Datenquelle: Open-Meteo (https://open-meteo.com/), CC BY 4.0.
Für kommerzielle Nutzung gelten die jeweiligen aktuellen Anbieterbedingungen.

## Offline-Tests

```bash
python3 -m unittest discover -s sandbox/weather_api -v
```

Die Tests simulieren die HTTP-Antwort; sie rufen den Wetterdienst nicht auf.
