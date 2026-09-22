export function loadWords(data: unknown): string[] {
  if (!Array.isArray(data)) {
    throw new Error('Die Wortliste muss ein JSON-Array sein.')
  }

  const words = data.map((word) =>
    typeof word === 'string' ? word.trim().toLocaleLowerCase('de-DE') : '',
  )

  if (
    words.length === 0 ||
    words.some((word) => !/^[a-zäöüß]+$/iu.test(word))
  ) {
    throw new Error('Die Wortliste enthält keine spielbaren Wörter.')
  }

  return words
}

export function selectWord(words: string[], random = Math.random): string {
  if (words.length === 0) {
    throw new Error('Es ist kein spielbares Wort verfügbar.')
  }

  return words[Math.floor(random() * words.length)]
}
