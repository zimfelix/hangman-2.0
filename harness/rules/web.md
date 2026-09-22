# Web- und Mobile-UI-Regeln

Diese Regeln gelten ausschließlich für die künftige React-/Vite-Webanwendung
unter `web/`. Sie ersetzen keine Regeln des universellen Harness und gelten
nicht für den abzulösenden Python-Konsolenbestand in `src/`.

## Referenz und Grenze

- Die Gestaltung orientiert sich an `https://speakki.de/`: hell, ruhig,
  typografisch klar, mit Slate-Neutraltönen, blauem Akzent, großzügigen Radien,
  feinen Rahmen und zurückhaltenden Übergängen.
- Die Referenz ist eine Inspiration für Designprinzipien, nicht ein Quelltext-
  oder Asset-Lieferant. Keine Logos, Texte, Bilder, SVGs, CSS-Klassen,
  Markenbegriffe oder Tracking-Implementierungen von SpeakKI kopieren.
- Die SaaS-Landingpage-Struktur der Referenz (Marketing-Hero, Preise, FAQ,
  Footer) wird nicht in ein Hangman-Spiel übertragen. Das Spiel erhält eine
  kompakte, auf die Runde konzentrierte Oberfläche.

## Visuelles System

- Lege globale CSS-Tokens für Farben, Schrift, Abstände, Radien, Rahmen und
  Übergänge an. Komponenten verwenden Tokens statt frei gewählter Einzelwerte.
- Verwende einen fast weißen Seitenhintergrund, weiße Inhaltsflächen und dunkle
  Slate-Töne für Text. Sekundärtext und Rahmen sind deutlich heller als
  Primärtext.
- Blau ist die einzige Primärfarbe für aktive Zustände, Hauptaktionen, Links
  und Fokus. Erfolg, Warnung und Fehler verwenden jeweils klar abgegrenzte,
  semantische Farben; Farbe ist nie der einzige Bedeutungsträger.
- Verwende eine moderne Sans-Serif-Schrift mit System-Fallback. Große
  Überschriften sind kräftig und mit leicht engem Tracking gesetzt; Lauftext
  bleibt ruhig und gut lesbar.
- Flächen wirken durch 1px-Rahmen, Abstand und gegebenenfalls einen sehr
  dezenten Schatten getrennt. Keine Gradienten, Glasmorphismus, Neon-Glow oder
  dekorativen Schlagschatten.
- Standardradien sind großzügig und konsistent: kleine Controls abgerundet,
  Spielkarte und Dialoge deutlich stärker. Buttons ändern beim Hover nicht ihre
  Größe.

## Komponenten und Spieloberfläche

- Die Anwendung verwendet eine schlanke App-Shell: Kopfbereich mit Spielname
  und zugänglichen Aktionen, zentraler Inhaltsbereich und bei Bedarf eine
  mobile Navigations- oder Einstellungsaktion.
- Die aktive Runde liegt in einer zentralen Spielkarte. Sie gruppiert
  Schwierigkeit, verdecktes Wort, Hangman-Fortschritt, Fehlversuche,
  Buchstabeneingabe und die nächste Aktion in einer eindeutigen Reihenfolge.
- Statistik und Einstellungen sind sekundäre Bereiche: als klar beschriftete
  Ansicht, Dialog oder ausklappbarer Bereich, niemals als konkurrierender
  Hauptinhalt während einer Runde.
- Buttons sind voll beschriftet, haben Verb- oder Ergebnisorientierung und
  verwenden Inline-SVGs nur als Ergänzung. Icons allein benötigen einen
  zugänglichen Namen.
- Verwende für Lade-, Leer-, Fehler-, Gewinn- und Verlustzustände dieselbe
  Karten- und Typografiesprache wie für den Normalzustand.
- Kleine Status-Chips dürfen Schwierigkeit, Spielstatus oder Kennzahlen
  darstellen. Sie sind keine dekorativen Elemente und enthalten immer Text.

## Mobile-first und Responsive Design

- Entwirf zuerst für schmale Handy-Ansichten; größere Ansichten erweitern das
  Layout, statt die mobile Ansicht nachträglich zu verkleinern.
- Die Spielrunde bleibt ohne horizontales Scrollen und ohne Zoom bedienbar.
- Der zentrale Inhalt erhält eine begrenzte Lesebreite und wächst auf großen
  Ansichten nicht unbegrenzt.
- Interaktive Ziele sind ausreichend groß und voneinander getrennt; sie dürfen
  nicht ausschließlich über Hover erreichbar sein.
- Informationen zu Wort, Fehlversuchen, Schwierigkeit und Spielzustand bleiben
  ohne Scrollen erreichbar, soweit die gewählte Bildschirmgröße dies zulässt.
- Nutze CSS Media Queries und flexible Layouts; gerätespezifische
  User-Agent-Abfragen sind verboten.

## Zustände, Bewegung und Accessibility

- Jede Ansicht definiert für ihre Daten mindestens Lade-, Leer-, Fehler- und
  Erfolgszustand, soweit diese Zustände fachlich möglich sind.
- Während einer laufenden Runde ist eindeutig sichtbar, welche Eingaben gültig
  sind und welche Buchstaben bereits geraten wurden.
- Gewinn, Verlust und Start einer neuen Runde sind eindeutig voneinander
  abgegrenzt und über Tastatur wie Zeiger bedienbar.
- Verwende semantisches HTML vor generischen Containern. Alle interaktiven
  Elemente sind mit Tastatur erreichbar und haben einen sichtbaren Fokuszustand.
- Formularelemente haben zugängliche Namen; Fehlermeldungen beschreiben das
  Problem textlich und nicht nur über Farbe. Statusänderungen sind für
  unterstützende Technologien wahrnehmbar.
- Übergänge sind kurz und reaktionsbezogen, etwa für Hover, Fokus, Dialoge und
  Zustandswechsel. Keine Scroll-Animationen, Count-ups, Autoplay-Sounds oder
  Bewegung ohne Nutzereingabe. Beachte `prefers-reduced-motion`.

## Abgrenzung

- Sichtbare Spieltexte, genaue Seitenstruktur und zusätzliche
  Spielinteraktionen werden in den jeweiligen Specs festgelegt.
- Kein visuelles Screenshot-Testing als Ersatz für Akzeptanzkriterien.
