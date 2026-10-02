"""Offline checks for the independent weather sandbox."""

import io
import json
import unittest
from contextlib import redirect_stdout
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError, URLError

from weather import main


class WeatherTests(unittest.TestCase):
    def test_request_and_temperature(self):
        """Request, JSON, and extracted values are visible."""
        payload = {
            "current": {"temperature_2m": 18.5, "time": "2026-01-01T12:00"},
            "current_units": {"temperature_2m": "°C"},
        }
        response = MagicMock()
        response.__enter__.return_value = response
        response.status = 200
        response.read.return_value = json.dumps(payload).encode("utf-8")
        output = io.StringIO()
        with (
            patch("weather.urlopen", return_value=response) as request,
            redirect_stdout(output),
        ):
            self.assertEqual(main(), 0)
        url = request.call_args.args[0]
        self.assertTrue(url.startswith("https://api.open-meteo.com/v1/forecast?"))
        for parameter in ("latitude=50.24", "longitude=11.33", "current=temperature_2m"):
            self.assertIn(parameter, url)
        self.assertEqual(request.call_args.kwargs["timeout"], 15)
        for expected in (
            "GET", "Status 200", json.dumps(payload), "18.5 °C", "2026-01-01T12:00"
        ):
            self.assertIn(expected, output.getvalue())

    def test_connection_errors(self):
        """HTTP and network failures return a readable error."""
        errors = (
            (HTTPError("https://example.com", 429, "Too Many Requests", {}, None),
             "HTTP-Fehler: 429"),
            (URLError("offline"), "Verbindungsfehler"),
            (TimeoutError("timeout"), "Verbindungsfehler"),
        )
        for error, message in errors:
            with self.subTest(error=error):
                output = io.StringIO()
                with (
                    patch("weather.urlopen", side_effect=error),
                    redirect_stdout(output),
                ):
                    self.assertEqual(main(), 1)
                self.assertIn(message, output.getvalue())

    def test_invalid_data(self):
        """Invalid JSON and unexpected structures are reported."""
        for payload in (b"not json", b"{}", b"null"):
            with self.subTest(payload=payload):
                response = MagicMock()
                response.__enter__.return_value = response
                response.status = 200
                response.read.return_value = payload
                output = io.StringIO()
                with (
                    patch("weather.urlopen", return_value=response),
                    redirect_stdout(output),
                ):
                    self.assertEqual(main(), 1)
                self.assertIn("Datenfehler", output.getvalue())


if __name__ == "__main__":
    unittest.main()
