# Minimaler Coding-Harness

Diese Regeln gelten unabhängig von Programmiersprache und Projektart. Sie sollen
zuverlässige Änderungen ermöglichen, ohne kleine Aufgaben unnötig aufzublähen.

## Begriffe

- **Harness:** Gesamtrahmen aus Regeln, Specs, Tests und Prüfwerkzeugen.
- **Spec-Driven:** Ein informeller Auftrag wird vor der Umsetzung in eine kleine,
  dauerhafte und prüfbare Spec überführt. Er wird nicht in einen System-Prompt
  übersetzt.
- **Test-Driven:** Tests werden aus den Akzeptanzkriterien abgeleitet und sichern
  das geforderte Verhalten ab.
- **Quality Gate:** Zentraler Prüfpunkt, der die für eine Änderung erforderlichen
  Tests und Qualitätsprüfungen ausführt.
- **Korrekturschleife:** Fehlgeschlagene Prüfungen werden eingeordnet, korrigiert
  und anschließend erneut ausgeführt.
- **Project Init:** Ein einmaliger Onboarding-Schritt, der ein Projektprofil aus
  Fragen erstellt. Er wird nicht bei jedem Auftrag erneut ausgeführt.

## 1. Auftrag und Kontext

- Verstehe zuerst Ziel, vorhandenen Code und relevante Projektregeln.
- Lade nur die Dateien, die für den aktuellen Auftrag nötig sind.
- Verwende Templates nur beim Erstellen oder gezielten Überarbeiten einer Datei;
  lade sie nicht als laufende Regeln bei jeder Aufgabe.
- Triff reversible Detailentscheidungen selbst. Frage nur nach, wenn eine offene
  Entscheidung Verhalten, Umfang oder Architektur wesentlich verändert.

## 2. Anforderungen

- Neues oder geändertes Nutzerverhalten benötigt vor der Umsetzung eine kleine Spec.
- Jede Spec enthält Ziel, überprüfbare Akzeptanzkriterien und eine Abgrenzung.
- Akzeptanzkriterien werden als `AK1`, `AK2` usw. nummeriert.
- Ein Akzeptanzkriterium beschreibt genau ein beobachtbares Ergebnis und besitzt
  ein eindeutiges Bestanden/Nicht-bestanden-Ergebnis.
- Technische Umsetzung gehört nur dann in ein Kriterium, wenn sie selbst Teil der
  Anforderung ist.
- Reine Dokumentation, Formatierung oder internes Refactoring benötigt keine neue
  Spec, solange sich das beobachtbare Verhalten nicht ändert.

## 3. Implementierung

- Implementiere nur den Umfang der aktiven Spec und notwendige direkte Folgewirkungen.
- Bewahre bestehende Architektur und Konventionen, sofern die Spec keine begründete
  Änderung verlangt.
- Bevorzuge einfachen, lesbaren Code gegenüber vorsorglicher Abstraktion.
- Trenne Benutzeroberfläche, Fachlogik und Datenzugriff gemäß dem Projektprofil.
- Verändere keine unabhängigen Dateien oder Funktionen nebenbei.

## 4. Quality Gate

1. Ordne jedes Akzeptanzkriterium mindestens einer sinnvollen Prüfung zu.
   Automatisierte Tests kennzeichnen die Zuordnung mit `S001-AK1` oder
   `s001_ak1` im Testnamen oder in einem kurzen `Covers`-Kommentar.
2. Führe während der Implementierung zuerst die kleinste passende Prüfung aus.
3. Führe vor dem Abschluss einmal das vollständige, für die Änderung passende
   Quality Gate aus.
4. Wiederhole bestandene Prüfungen nur nach weiteren Änderungen oder wenn ein
   konkreter Zweifel besteht.
5. Markiere eine Story erst als `Implemented`, wenn alle Kriterien umgesetzt und
   die erforderlichen Prüfungen bestanden sind.

Nicht jedes Detail benötigt einen automatisierten Test. Automatisiere vor allem
Fachlogik, Fehlerfälle und Verhalten, das leicht erneut beschädigt werden kann.
Reine Dokumentationsänderungen benötigen kein vollständiges Code-Quality-Gate.
Auch kleine Codeänderungen sind erst nach dem passenden Quality Gate abgeschlossen;
der Umfang der Prüfung darf jedoch proportional klein sein.

## 5. Story-State

- **`Modified`:** Die Spec ist neu oder geändert, oder ihre Übereinstimmung mit
  Code und Prüfungen ist noch nicht nachgewiesen.
- **`Implemented`:** Alle Akzeptanzkriterien sind umgesetzt und das erforderliche
  Quality Gate ist bestanden.

Ein zusätzlicher Status `Not tested` wird nicht verwendet. Nicht ausgeführte oder
fehlgeschlagene Prüfungen verhindern den Wechsel von `Modified` zu `Implemented`.
Reine Bugfixes oder Refactorings ohne Spec-Änderung verändern den bestehenden
Story-State nicht; der jeweilige Auftrag ist trotzdem erst nach dem passenden
Quality Gate abgeschlossen.

## 6. Korrekturschleife

Bei einer fehlgeschlagenen Prüfung wird zuerst die Ursache eingeordnet:

- **Codefehler:** Spec und Prüfung sind richtig; korrigiere den Code.
- **Prüfungsfehler:** Die Prüfung widerspricht der Spec oder testet irrelevante
  Implementierungsdetails; korrigiere die Prüfung.
- **Spec-Fehler:** Das erwartete Verhalten ist widersprüchlich oder nicht eindeutig;
  kläre oder korrigiere die Spec vor weiteren Codeänderungen.
- **Harness-Fehler:** Eine allgemeine Regel erzeugt wiederholt falsche oder fehlende
  Ergebnisse; schlage eine kleine Regeländerung mit Begründung vor.

Ein einzelner Implementierungsfehler ist kein Grund, den Harness zu ändern.
Harness-Änderungen müssen konservativ, projektübergreifend sinnvoll und vom Nutzer
nachvollziehbar sein.

## 7. Abschluss

- Jede verhaltensrelevante Änderung benötigt entweder eine aktualisierte Spec
  oder eine neue Correction-Spec sowie einen passenden Test. Reine interne
  Änderungen bleiben durch Commit und bestehende Prüfungen nachvollziehbar.
- Specs dokumentieren Anforderungen und Nachweise; Git-Commits dokumentieren
  die feingranulare Entwicklungsgeschichte. Eine Spec-ID wird, falls vorhanden,
  im Commit-Titel verwendet, zum Beispiel `S004: Google Calendar booking`.
- Wenn die Projektregeln automatisches Delivery erlauben, wird nach bestandenem
  Quality Gate ein zusammenhängender Arbeitsstand committed und gepusht.
- Es werden nur Dateien des aktuellen Auftrags committed. Unklare oder fremde
  Änderungen bleiben unberührt und werden dem Nutzer gemeldet.
- Kein Force-Push, kein automatischer Merge, kein Umschreiben der Git-Historie
  und kein Push bei fehlgeschlagenem Gate oder erkannten Zugangsdaten/Secrets.
- Berichte kurz, was geändert und wie es geprüft wurde.
- Nenne verbleibende Unsicherheiten oder nicht ausgeführte Prüfungen ausdrücklich.
- Erzeuge keine umfangreichen Protokolle oder Zwischenberichte, wenn sie für die
  Aufgabe keinen dauerhaften Nutzen haben.
