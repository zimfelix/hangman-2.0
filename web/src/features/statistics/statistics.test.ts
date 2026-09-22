import { beforeEach, describe, expect, it } from 'vitest'
import {
  emptyStatistics,
  loadStatistics,
  recordResult,
  saveStatistics,
  statisticsStorageKey,
} from './statistics'

function createStorage(): Storage {
  const values = new Map<string, string>()

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size
    },
  }
}

describe('statistics persistence', () => {
  let storage: Storage

  beforeEach(() => {
    storage = createStorage()
  })

  it('S006-AK8 and S006-AK9 loads, updates, and saves total statistics', () => {
    storage.setItem(
      statisticsStorageKey,
      JSON.stringify({ wins: 2, losses: 1 }),
    )

    const loadedStatistics = loadStatistics(storage)
    const updatedStatistics = recordResult(loadedStatistics, 'won')
    saveStatistics(storage, updatedStatistics)

    expect(loadedStatistics).toEqual({ wins: 2, losses: 1 })
    expect(updatedStatistics).toEqual({ wins: 3, losses: 1 })
    expect(loadStatistics(storage)).toEqual({ wins: 3, losses: 1 })
  })

  it('S006-AK9 uses an empty statistic for malformed stored data', () => {
    storage.setItem(statisticsStorageKey, '{broken')

    expect(loadStatistics(storage)).toEqual(emptyStatistics)
  })
})
