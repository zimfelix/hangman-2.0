"""A small HTTP and JSON learning example using Open-Meteo."""

import json
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import urlopen

# Approximate coordinates of Kronach; no geocoding request is needed.
ENDPOINT = "https://api.open-meteo.com/v1/forecast"
PARAMETERS = {
    "latitude": 50.24,
    "longitude": 11.33,
    "current": "temperature_2m",
    "timezone": "Europe/Berlin",
}


def main() -> int:
    """Fetch weather, show the response, and extract one temperature."""
    url = ENDPOINT + "?" + urlencode(PARAMETERS)
    print("1. HTTP-Anfrage: GET")
    print(url)

    try:
        # Python acts as the client. The server sends JSON text via HTTP.
        with urlopen(url, timeout=15) as response:
            status = response.status
            json_text = response.read().decode("utf-8")
    except HTTPError as error:
        print(f"HTTP-Fehler: {error.code} {error.reason}")
        error.close()
        return 1
    except (URLError, TimeoutError, OSError) as error:
        print(f"Verbindungsfehler: {error}")
        return 1
    except UnicodeDecodeError:
        print("Datenfehler: Die Antwort ist kein gültiger UTF-8-Text.")
        return 1

    print(f"\n2. HTTP-Antwort: Status {status}")
    print("JSON-Text vom Server:")
    print(json_text)

    try:
        # Deserialization: JSON text becomes Python dictionaries and values.
        data = json.loads(json_text)
        current = data["current"]
        temperature = current["temperature_2m"]
        unit = data["current_units"]["temperature_2m"]
        timestamp = current["time"]
    except (json.JSONDecodeError, KeyError, TypeError):
        print("Datenfehler: Die Antwort enthält nicht die erwarteten Wetterdaten.")
        return 1

    print("\n3. Aus den Python-Daten gelesen:")
    print(f"Kronach: {temperature} {unit} (Datenzeitpunkt: {timestamp})")
    print("Zeitzone: Europe/Berlin")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
