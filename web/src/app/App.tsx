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

  const words = loadWords(wordData)
  return createGame(selectWord(words), option.maxMistakes)
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
    if (game === null) {
      return
    }

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
    <main className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="/"
          onClick={(event) => event.preventDefault()}
        >
          Hangman<span>.</span>
        </a>
        <button
          className="secondary-button"
          onClick={() => setShowStatistics(true)}
          type="button"
        >
          Statistik
        </button>
      </header>

      <div className="page-content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Wortspiel</p>
          <h1 id="page-title">Ein Buchstabe nach dem anderen.</h1>
          <p>Finden Sie das Wort, bevor die Fehlversuche aufgebraucht sind.</p>
        </section>

        {error !== null && (
          <section aria-live="assertive" className="error-card">
            <h2>Die Wortliste kann nicht verwendet werden</h2>
            <p>{error}</p>
          </section>
        )}

        {game === null && error === null && (
          <section
            aria-labelledby="difficulty-title"
            className="game-card start-card"
          >
            <p className="eyebrow">Neue Runde</p>
            <h2 id="difficulty-title">Wählen Sie eine Schwierigkeit.</h2>
            <div className="difficulty-grid">
              {difficultyOptions.map((option) => (
                <button
                  className="difficulty-button"
                  key={option.id}
                  onClick={() => handleStartGame(option.id)}
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
                <h2 id="round-title">
                  {game.phase === 'playing'
                    ? 'Ihr Zug'
                    : game.phase === 'won'
                      ? 'Gewonnen'
                      : 'Verloren'}
                </h2>
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
                        onClick={() => handleGuess(letter)}
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
                <button
                  className="primary-button"
                  onClick={() => setGame(null)}
                  type="button"
                >
                  Neue Runde wählen
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      {showStatistics && (
        <StatisticsDialog
          onClose={() => setShowStatistics(false)}
          sessionStatistics={sessionStatistics}
          totalStatistics={totalStatistics}
        />
      )}
    </main>
  )
}
