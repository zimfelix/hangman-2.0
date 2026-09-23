# Web-Bereich

Gilt nur für `web/`. Die vorhandene React-/TypeScript-/Vite-SPA bleibt eine
unabhängige lokale Umsetzung, kein Frontend der Terminalanwendung.

- `src/features/game/` enthält die Spielregeln; `src/app/App.tsx` komponiert
  Landingpage, Spiel und Sitzungszustand. Die Trennung von Regeln und
  Seiteneffekten steht in `code.md`. `src/features/statistics/` bündelt die
  Funktionen für `localStorage`; die eigene Wortliste liegt unter `src/data/`.
  Nur die Gesamtstatistik ist dauerhaft lokal; keine Netzwerkintegration
  oder Zahlungen erfinden.
- Das CSS ist mobile-first angelegt: Bei Änderungen schmale und breite Ansichten
  ohne horizontales Scrollen prüfen. Für Spiel, Navigation und Statistikdialog
  semantische Elemente, Tastaturbedienung inklusive Dialogfokus, sichtbaren
  Fokus, verständliche Status- und Fehlermeldungen und zugängliche Namen und
  Kontraste prüfen. `prefers-reduced-motion` berücksichtigen. Tokens und
  Responsive-Regeln stehen in `src/styles/global.css`. Ein grüner axe-Scan
  ersetzt keinen gezielten Tastaturtest (siehe `quality-matrix.md`).
- Landingpage-Pakete sind ausschließlich Designprototypen. Externe
  Designreferenzen liefern höchstens Prinzipien; keine fremden Marken,
  Texte, Assets, Quellen oder Tracking übernehmen.
- Für Webänderungen das Web-Gate aus `project.md` anwenden; Vitest und
  Playwright/axe-Nachweise und ihre Grenzen stehen in `testing.md` und
  `quality-matrix.md`.
