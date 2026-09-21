"""Game state and rules for Hangman."""

from enum import Enum


class GuessResult(Enum):
    """Possible outcomes of one guess."""

    CORRECT = "correct"
    INCORRECT = "incorrect"
    ALREADY_GUESSED = "already_guessed"
    INVALID = "invalid"


class Hangman:
    """Manage the state and rules of one Hangman round."""

    def __init__(self, word: str, max_incorrect_guesses: int = 6) -> None:
        normalized_word = word.strip().lower()
        if not normalized_word or not normalized_word.isalpha():
            raise ValueError("The word must contain alphabetic characters only.")
        if max_incorrect_guesses < 1:
            raise ValueError("At least one incorrect guess must be allowed.")

        self.word = normalized_word
        self.max_incorrect_guesses = max_incorrect_guesses
        self._guessed_letters: set[str] = set()
        self._incorrect_guesses = 0

    @property
    def guessed_letters(self) -> tuple[str, ...]:
        """Return all guessed letters in alphabetical order."""
        return tuple(sorted(self._guessed_letters))

    @property
    def incorrect_guesses(self) -> int:
        """Return the number of incorrect guesses."""
        return self._incorrect_guesses

    @property
    def remaining_attempts(self) -> int:
        """Return how many incorrect guesses are still allowed."""
        return self.max_incorrect_guesses - self._incorrect_guesses

    @property
    def revealed_word(self) -> str:
        """Return the word with unknown letters replaced by underscores."""
        visible_characters = (
            character if character in self._guessed_letters else "_"
            for character in self.word
        )
        return " ".join(visible_characters)

    @property
    def is_won(self) -> bool:
        """Return whether every letter in the word was guessed."""
        return set(self.word).issubset(self._guessed_letters)

    @property
    def is_lost(self) -> bool:
        """Return whether no incorrect guesses remain."""
        return self.remaining_attempts == 0 and not self.is_won

    @property
    def is_over(self) -> bool:
        """Return whether the round has ended."""
        return self.is_won or self.is_lost

    def guess(self, letter: str) -> GuessResult:
        """Apply one guess and return its result."""
        normalized_letter = letter.strip().lower()
        if len(normalized_letter) != 1 or not normalized_letter.isalpha():
            return GuessResult.INVALID
        if normalized_letter in self._guessed_letters:
            return GuessResult.ALREADY_GUESSED

        self._guessed_letters.add(normalized_letter)
        if normalized_letter in self.word:
            return GuessResult.CORRECT

        self._incorrect_guesses += 1
        return GuessResult.INCORRECT