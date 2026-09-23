# Testkonventionen

- Terminal: `tests/test_*.py` prüfen Spiellogik, UI-Eingaben, Main-Orchestrierung
  und JSON-Dateien mit pytest. `tmp_path` für Schreibtests verwenden;
  Eingaben/Zufall und Abhängigkeiten in Tests kontrollieren, nicht die echte
  `data/statistics.json` verändern. `scripts/verify.py` prüft außerdem Syntax,
  Ruff und Marker der Terminal-Stories.
- Web: `web/src/**/*.test.ts` prüfen mit Vitest (`jsdom`) reine Spiellogik,
  JSON-Wortdaten und Statistik mit Storage-Fake. `web/tests/e2e/*.spec.ts`
  prüfen mit Playwright/Chromium die gebaute App via `vite preview`;
  axe-core erfasst automatisierbare Accessibility-Probleme.
  `web/scripts/check-spec-coverage.mjs` prüft Web-Stories und Marker.
- Die Tests verknüpfen Akzeptanzkriterien aus `specs/terminal/` bzw.
  `specs/web/` mit Markern `SXXX-AKX` (oder begründetem bestandenem
  statischem/manuellem Nachweis in der Spec). Ein Marker-Check beweist
  Zuordnung, nicht fachliche Richtigkeit. Bei Änderungen an Verhalten
  zielgerichtete Tests ergänzen und das Bereichs-Gate aus `project.md`
  ausführen; beide Gates nur wenn beide Bereiche betroffen sind.
