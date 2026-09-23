# SXXX – Kurzer Titel

## Meta

- **State:** Modified

## User Story

Als **[Nutzerrolle]** möchte ich **[Verhalten]**, damit **[Nutzen]**.

## Beschreibung

Fachlicher Umfang und wichtiger Ablauf in wenigen Sätzen. Keine technische Lösung und kein Prompt-Verlauf.

## Akzeptanzkriterien

- **AK1:** Ein atomar beobachtbares Verhalten mit eindeutigem Pass/Fail.
- **AK2:** Ein weiterer unabhängig prüfbarer Fall, nur wenn benötigt.

## Nicht im Umfang

- Bewusst ausgeschlossene Funktion oder spätere Idee.

## Nachweise

Tests referenzieren die zugehörigen Kriterien, z. B. mit `SXXX-AK1`; keine Testliste doppelt pflegen. Nur wenn Automatisierung nicht sinnvoll ist, hier eine begründete Ausnahme festhalten; ungenutzte Beispielzeilen löschen:

- **AKX [Statisch]:** `PASS` — Befehl und beobachtetes Ergebnis.
- **AKY [Manuell]:** `PASS` — Ablauf und beobachtetes Ergebnis.
- **Quality Gate:** projektspezifischer Befehl und Ergebnis.

`State: Implemented` erst nach Nachweis aller AK und bestandenem Quality Gate; sonst `Modified`.
