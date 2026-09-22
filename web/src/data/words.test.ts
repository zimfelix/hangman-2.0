import { describe, expect, it } from 'vitest'
import { loadWords, selectWord } from './words'

describe('word data', () => {
  it('S006-AK7 loads playable words from a JSON array', () => {
    expect(loadWords([' Apfel ', 'haus'])).toEqual(['apfel', 'haus'])
    expect(selectWord(['apfel'], () => 0)).toBe('apfel')
  })

  it('S006-AK7 rejects unavailable or unplayable word data', () => {
    expect(() => loadWords({ words: ['apfel'] })).toThrow('JSON-Array')
    expect(() => loadWords(['apfel', 'hello world'])).toThrow(
      'keine spielbaren',
    )
    expect(() => selectWord([])).toThrow('kein spielbares Wort')
  })
})
