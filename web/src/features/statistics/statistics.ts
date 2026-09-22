export interface Statistics {
  wins: number
  losses: number
}

export const emptyStatistics: Statistics = { wins: 0, losses: 0 }
export const statisticsStorageKey = 'hangman-statistics-v1'

function isStatistics(value: unknown): value is Statistics {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  const { wins, losses } = candidate
  return (
    typeof wins === 'number' &&
    typeof losses === 'number' &&
    Number.isInteger(wins) &&
    Number.isInteger(losses) &&
    wins >= 0 &&
    losses >= 0
  )
}

export function loadStatistics(storage: Storage): Statistics {
  const value = storage.getItem(statisticsStorageKey)
  if (value === null) {
    return emptyStatistics
  }

  try {
    const parsedValue: unknown = JSON.parse(value)
    return isStatistics(parsedValue) ? parsedValue : emptyStatistics
  } catch {
    return emptyStatistics
  }
}

export function saveStatistics(storage: Storage, statistics: Statistics): void {
  if (!isStatistics(statistics)) {
    throw new Error('Die Statistik enthält ungültige Werte.')
  }

  storage.setItem(statisticsStorageKey, JSON.stringify(statistics))
}

export function recordResult(
  statistics: Statistics,
  result: 'won' | 'lost',
): Statistics {
  return result === 'won'
    ? { ...statistics, wins: statistics.wins + 1 }
    : { ...statistics, losses: statistics.losses + 1 }
}
