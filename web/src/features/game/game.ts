export type Difficulty = 'easy' | 'normal' | 'hard'
export type GamePhase = 'playing' | 'won' | 'lost'

export interface DifficultyOption {
  id: Difficulty
  label: string
  maxMistakes: number
}

export interface GameState {
  word: string
  guessedLetters: string[]
  maxMistakes: number
  mistakes: number
  phase: GamePhase
}

export const difficultyOptions: DifficultyOption[] = [
  { id: 'easy', label: 'Leicht', maxMistakes: 8 },
  { id: 'normal', label: 'Normal', maxMistakes: 6 },
  { id: 'hard', label: 'Schwer', maxMistakes: 4 },
]

export function createGame(word: string, maxMistakes: number): GameState {
  return {
    word: word.toLocaleLowerCase('de-DE'),
    guessedLetters: [],
    maxMistakes,
    mistakes: 0,
    phase: 'playing',
  }
}

export function guessLetter(game: GameState, letter: string): GameState {
  const normalizedLetter = letter.toLocaleLowerCase('de-DE')

  if (
    game.phase !== 'playing' ||
    !/^[a-zäöüß]$/iu.test(normalizedLetter) ||
    game.guessedLetters.includes(normalizedLetter)
  ) {
    return game
  }

  const guessedLetters = [...game.guessedLetters, normalizedLetter]
  const mistakes = game.word.includes(normalizedLetter)
    ? game.mistakes
    : game.mistakes + 1
  const hasWon = [...game.word].every((wordLetter) =>
    guessedLetters.includes(wordLetter),
  )
  const phase = hasWon
    ? 'won'
    : mistakes >= game.maxMistakes
      ? 'lost'
      : 'playing'

  return { ...game, guessedLetters, mistakes, phase }
}

export function displayWord(game: GameState): string {
  return [...game.word]
    .map((letter) => (game.guessedLetters.includes(letter) ? letter : '_'))
    .join(' ')
}

export function remainingMistakes(game: GameState): number {
  return game.maxMistakes - game.mistakes
}
