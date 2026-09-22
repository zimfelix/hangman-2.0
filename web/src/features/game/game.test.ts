import { describe, expect, it } from 'vitest'
import { createGame, displayWord, guessLetter, remainingMistakes } from './game'

describe('game rules', () => {
  it('S006-AK2 starts a game with the selected number of mistakes', () => {
    const game = createGame('apfel', 8)

    expect(game.maxMistakes).toBe(8)
    expect(remainingMistakes(game)).toBe(8)
  })

  it('S006-AK3 and S006-AK4 reveals every matching letter and counts a wrong guess', () => {
    const game = createGame('allee', 4)
    const afterCorrectGuess = guessLetter(game, 'l')
    const afterWrongGuess = guessLetter(afterCorrectGuess, 'z')

    expect(displayWord(afterCorrectGuess)).toBe('_ l l _ _')
    expect(afterCorrectGuess.mistakes).toBe(0)
    expect(afterWrongGuess.mistakes).toBe(1)
    expect(remainingMistakes(afterWrongGuess)).toBe(3)
  })

  it('S006-AK5 leaves the game unchanged for invalid or repeated guesses', () => {
    const game = guessLetter(createGame('apfel', 4), 'a')

    expect(guessLetter(game, 'a')).toEqual(game)
    expect(guessLetter(game, 'ab')).toEqual(game)
    expect(guessLetter(game, '1')).toEqual(game)
  })

  it('S006-AK6 marks winning and losing rounds', () => {
    const wonGame = guessLetter(guessLetter(createGame('ab', 2), 'a'), 'b')
    const lostGame = guessLetter(guessLetter(createGame('ab', 2), 'x'), 'y')

    expect(wonGame.phase).toBe('won')
    expect(lostGame.phase).toBe('lost')
  })
})
