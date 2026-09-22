import { useState } from 'react'
import wordData from '../data/words.json'
import { loadWords, selectWord } from '../data/words'
import {
  createGame,
  difficultyOptions,
  displayWord,
  guessLetter,
  remainingMistakes,
  type Difficulty,
  type GameState,
} from '../features/game/game'
import {
  emptyStatistics,
  loadStatistics,
  recordResult,
  saveStatistics,
  type Statistics,
} from '../features/statistics/statistics'

const alphabet = 'abcdefghijklmnopqrstuvwxyzäöüß'.split('')

function startGame(difficulty: Difficulty): GameState {
  const option = difficultyOptions.find((item) => item.id === difficulty)

  if (option === undefined) {
    throw new Error('Die gewählte Schwierigkeit ist nicht verfügbar.')
  }

  return createGame(selectWord(loadWords(wordData)), option.maxMistakes)
}

function HangmanFigure({
  mistakes,
  maxMistakes,
}: Pick<GameState, 'mistakes' | 'maxMistakes'>) {
  const visibleParts = Math.ceil((mistakes / maxMistakes) * 6)

  return (
    <svg
      aria-label={`Hangman-Fortschritt: ${mistakes} von ${maxMistakes} Fehlversuchen`}
      className="hangman-figure"
      role="img"
      viewBox="0 0 180 180"
    >
      <path d="M25 160h110M55 160V20h75M130 20v25" />
      {visibleParts >= 1 && <circle cx="130" cy="60" r="15" />}
      {visibleParts >= 2 && <path d="M130 75v43" />}
      {visibleParts >= 3 && <path d="M130 88l-25 20" />}
      {visibleParts >= 4 && <path d="M130 88l25 20" />}
      {visibleParts >= 5 && <path d="M130 118l-22 25" />}
      {visibleParts >= 6 && <path d="M130 118l22 25" />}
    </svg>
  )
}

function StatisticsDialog({
  sessionStatistics,
  totalStatistics,
  onClose,
}: {
  sessionStatistics: Statistics
  totalStatistics: Statistics
  onClose: () => void
}) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <section
        aria-labelledby="statistics-title"
        aria-modal="true"
        className="dialog"
        role="dialog"
      >
        <div className="dialog__header">
          <div>
            <p className="eyebrow">Fortschritt</p>
            <h2 id="statistics-title">Ihre Statistik</h2>
          </div>
          <button
            aria-label="Statistik schließen"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="statistics-grid">
          <StatisticsCard
            label="Diese Sitzung"
            statistics={sessionStatistics}
          />
          <StatisticsCard label="Insgesamt" statistics={totalStatistics} />
        </div>
      </section>
    </div>
  )
}

function StatisticsCard({
  label,
  statistics,
}: {
  label: string
  statistics: Statistics
}) {
  return (
    <section aria-label={label} className="statistics-card">
      <h3>{label}</h3>
      <dl>
        <div>
          <dt>Gewonnen</dt>
          <dd>{statistics.wins}</dd>
        </div>
        <div>
          <dt>Verloren</dt>
          <dd>{statistics.losses}</dd>
        </div>
      </dl>
    </section>
  )
}

function GameSection({
  error,
  game,
  onGuess,
  onStart,
}: {
  error: string | null
  game: GameState | null
  onGuess: (letter: string) => void
  onStart: (difficulty: Difficulty) => void
}) {
  return (
    <section className="section section--game" id="spiel">
      <div className="section-heading">
        <p className="eyebrow">Direkt loslegen</p>
        <h2>Ihre nächste Runde wartet.</h2>
        <p>
          Wählen Sie die Schwierigkeit und finden Sie das Wort Buchstabe für
          Buchstabe.
        </p>
      </div>
      {error !== null && (
        <section aria-live="assertive" className="error-card">
          <h3>Die Wortliste kann nicht verwendet werden</h3>
          <p>{error}</p>
        </section>
      )}
      {game === null && error === null && (
        <section
          aria-labelledby="difficulty-title"
          className="game-card start-card"
        >
          <p className="eyebrow">Neue Runde</p>
          <h3 id="difficulty-title">Wählen Sie eine Schwierigkeit.</h3>
          <div className="difficulty-grid">
            {difficultyOptions.map((option) => (
              <button
                className="difficulty-button"
                key={option.id}
                onClick={() => onStart(option.id)}
                type="button"
              >
                <strong>{option.label}</strong>
                <span>{option.maxMistakes} Fehlversuche</span>
              </button>
            ))}
          </div>
        </section>
      )}
      {game !== null && (
        <section aria-labelledby="round-title" className="game-card">
          <div className="round-header">
            <div>
              <p className="eyebrow">Aktive Runde</p>
              <h3 id="round-title">
                {game.phase === 'playing'
                  ? 'Ihr Zug'
                  : game.phase === 'won'
                    ? 'Gewonnen'
                    : 'Verloren'}
              </h3>
            </div>
            <span className="status-chip">
              {remainingMistakes(game)} Versuche frei
            </span>
          </div>
          <HangmanFigure
            maxMistakes={game.maxMistakes}
            mistakes={game.mistakes}
          />
          <p aria-label="Verdecktes Wort" className="word-display">
            {displayWord(game)}
          </p>
          <p className="mistake-count">
            Fehlversuche: {game.mistakes} von {game.maxMistakes}
          </p>
          {game.phase === 'playing' ? (
            <>
              <p className="keyboard-label" id="keyboard-label">
                Wählen Sie einen Buchstaben.
              </p>
              <div
                aria-labelledby="keyboard-label"
                className="letter-grid"
                role="group"
              >
                {alphabet.map((letter) => {
                  const isGuessed = game.guessedLetters.includes(letter)
                  return (
                    <button
                      aria-label={`Buchstabe ${letter}`}
                      className="letter-button"
                      disabled={isGuessed}
                      key={letter}
                      onClick={() => onGuess(letter)}
                      type="button"
                    >
                      {letter}
                    </button>
                  )
                })}
              </div>
              {game.guessedLetters.length > 0 && (
                <p className="guessed-letters">
                  Geraten: {game.guessedLetters.join(', ')}
                </p>
              )}
            </>
          ) : (
            <div aria-live="polite" className="result-panel">
              <p>
                {game.phase === 'won'
                  ? 'Sie haben das Wort erraten.'
                  : `Das Lösungswort war „${game.word}“.`}
              </p>
              <a
                className="primary-button"
                href="#spiel"
                onClick={() => onStart('normal')}
              >
                Neue Runde starten
              </a>
            </div>
          )}
        </section>
      )}
    </section>
  )
}

const benefits = [
  [
    'Wortschatz aktivieren',
    'Bekannte Wörter bewusst zusammensetzen und neue Begriffe entdecken.',
  ],
  [
    'Fokus trainieren',
    'Eine ruhige Runde mit einer klaren Aufgabe statt endloser Ablenkung.',
  ],
  [
    'Fortschritt sehen',
    'Gewonnene und verlorene Runden bleiben lokal in Ihrer Statistik sichtbar.',
  ],
]

const plans = [
  {
    name: 'Kostenlos',
    price: '0 €',
    detail: 'Für eine entspannte Runde zwischendurch.',
    items: [
      'Alle Schwierigkeitsstufen',
      'Lokale Statistik',
      'Unbegrenzt spielen',
    ],
  },
  {
    name: 'Plus',
    price: '4,90 €',
    detail: 'Der Designprototyp für regelmäßige Wortfans.',
    items: ['Alles aus Kostenlos', 'Erweiterte Wortpakete', 'Wochenübersicht'],
    featured: true,
  },
  {
    name: 'Pro',
    price: '9,90 €',
    detail: 'Der Designprototyp für anspruchsvolle Runden.',
    items: ['Alles aus Plus', 'Eigene Wortlisten', 'Persönliche Ziele'],
  },
]

export function App() {
  const [sessionStatistics, setSessionStatistics] =
    useState<Statistics>(emptyStatistics)
  const [totalStatistics, setTotalStatistics] = useState<Statistics>(() =>
    loadStatistics(localStorage),
  )
  const [game, setGame] = useState<GameState | null>(null)
  const [showStatistics, setShowStatistics] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleStartGame(difficulty: Difficulty) {
    try {
      setGame(startGame(difficulty))
      setError(null)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Die Runde konnte nicht gestartet werden.',
      )
    }
  }

  function handleGuess(letter: string) {
    if (game === null) return
    const nextGame = guessLetter(game, letter)
    setGame(nextGame)
    if (game.phase === 'playing' && nextGame.phase !== 'playing') {
      const nextSessionStatistics = recordResult(
        sessionStatistics,
        nextGame.phase,
      )
      const nextTotalStatistics = recordResult(totalStatistics, nextGame.phase)
      setSessionStatistics(nextSessionStatistics)
      setTotalStatistics(nextTotalStatistics)
      saveStatistics(localStorage, nextTotalStatistics)
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#oben">
          Hangman<span>.</span>
        </a>
        <nav aria-label="Hauptnavigation" className="main-nav">
          <a href="#spiel">Spiel</a>
          <a href="#vorteile">Vorteile</a>
          <a href="#preise">Preise</a>
          <a href="#ueber">Über Hangman</a>
        </nav>
        <button
          className="secondary-button"
          onClick={() => setShowStatistics(true)}
          type="button"
        >
          Statistik
        </button>
      </header>

      <main id="oben">
        <section className="hero">
          <div className="hero__content">
            <p className="eyebrow">Das Wortspiel für zwischendurch</p>
            <h1>Geben Sie Ihrem Gedächtnis ein Wort.</h1>
            <p>
              Hangman verbindet Konzentration, Wortschatz und eine kleine
              Denkpause. Eine Runde dauert nur wenige Minuten.
            </p>
            <div className="hero__actions">
              <a className="primary-button" href="#spiel">
                Jetzt spielen
              </a>
              <a className="text-link" href="#vorteile">
                Mehr erfahren
              </a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Spielhinweis">
            <span className="status-chip">Bereit für eine Runde</span>
            <strong>Ein Wort. Ein Hinweis. Ihre nächste Idee.</strong>
            <p>
              Wählen Sie eine Schwierigkeit und starten Sie direkt im Browser.
            </p>
          </aside>
        </section>

        <GameSection
          error={error}
          game={game}
          onGuess={handleGuess}
          onStart={handleStartGame}
        />

        <section className="section section--muted" id="vorteile">
          <div className="section-heading">
            <p className="eyebrow">Warum Hangman</p>
            <h2>Ein kleines Spiel mit klarer Aufgabe.</h2>
            <p>
              Keine endlosen Levels, kein Zeitdruck. Nur ein Wort, ein paar
              Buchstaben und Ihr nächster Gedanke.
            </p>
          </div>
          <div className="benefit-grid">
            {benefits.map(([title, description], index) => (
              <article className="benefit-card" key={title}>
                <span className="benefit-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="preise">
          <div className="section-heading">
            <p className="eyebrow">Pakete</p>
            <h2>Einfach anfangen. Später erweitern.</h2>
            <p>
              Diese Pakete sind ein Designprototyp. Sie führen alle direkt zum
              Spiel und enthalten keinen Kaufprozess.
            </p>
          </div>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <article
                className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
                key={plan.name}
              >
                {plan.featured && <span className="plan-label">Beliebt</span>}
                <h3>{plan.name}</h3>
                <p className="plan-detail">{plan.detail}</p>
                <p className="plan-price">
                  {plan.price}
                  <span>
                    {plan.price === '0 €' ? ' dauerhaft' : ' / Monat'}
                  </span>
                </p>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  className={
                    plan.featured ? 'primary-button' : 'secondary-button'
                  }
                  href="#spiel"
                >
                  Runde starten
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--about" id="ueber">
          <div>
            <p className="eyebrow">Über Hangman</p>
            <h2>Ein Lernprojekt, das spielbar bleibt.</h2>
          </div>
          <p>
            Dieses lokale Projekt entwickelt Hangman in kleinen Schritten
            weiter: zuerst als Terminalspiel, dann als unabhängige Website. Die
            Website speichert Ihre Statistik nur in Ihrem Browser und benötigt
            kein Konto.
          </p>
        </section>
      </main>

      <footer className="footer">
        <div>
          <a className="brand" href="#oben">
            Hangman<span>.</span>
          </a>
          <p>Ein lokales Wortspiel zum konzentrierten Abschalten.</p>
        </div>
        <nav aria-label="Footer-Navigation">
          <a href="#spiel">Spiel starten</a>
          <a href="#ueber">Über Hangman</a>
          <button
            className="footer-link"
            onClick={() => setShowStatistics(true)}
            type="button"
          >
            Statistik
          </button>
        </nav>
        <p className="footer__note">
          Preise sind Designprototypen. Keine Zahlung erforderlich.
        </p>
      </footer>

      {showStatistics && (
        <StatisticsDialog
          onClose={() => setShowStatistics(false)}
          sessionStatistics={sessionStatistics}
          totalStatistics={totalStatistics}
        />
      )}
    </div>
  )
}
