import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const {
    board,
    correctWord,
    currentAttempt,
    setDisabledLetters,
    highContrast,
    setCorrectKeys,
    setAlmostKeys,
    darkMode
  } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correctWordArray = correctWord.toUpperCase().split("");

  const correctWordCount = correctWordArray.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  const guessCount = {};

  let isCorrect = false;
  let isAlmost = false;

  for (let i = 0; i < 5; i++) {
    if (board[attemptVal][i] === correctWordArray[i]) {
      const guessedLetter = board[attemptVal][i];
      guessCount[guessedLetter] = (guessCount[guessedLetter] || 0) + 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    const guessedLetter = board[attemptVal][i];
    if (!isCorrect && correctWordArray.includes(guessedLetter)) {
      const totalCorrectAndAlmost = guessCount[guessedLetter] || 0;
      if (totalCorrectAndAlmost < correctWordCount[guessedLetter]) {
        guessCount[guessedLetter] = totalCorrectAndAlmost + 1;
        if (i === letterPos) {
          isAlmost = true;
        }
      }
    }
  }

  if (board[attemptVal][letterPos] === correctWordArray[letterPos]) {
    isCorrect = true;
    isAlmost = false;
  }

  const letterState =
    currentAttempt.attempt > attemptVal &&
    (isCorrect && !highContrast && darkMode
      ? "correct-dark"
      : isCorrect && !highContrast && !darkMode
      ? "correct-light"
      : isAlmost && !highContrast && darkMode
      ? "almost-dark"
      : isAlmost && !highContrast && !darkMode
      ? "almost-light"
      : isCorrect && highContrast
      ? "correct-contrast"
      : isAlmost && highContrast
      ? "almost-contrast"
      : !isCorrect && ! isAlmost && darkMode
      ? "error-dark"
      : "error-light");

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  useEffect(() => {
    if (letter !== "" && correct) {
      setCorrectKeys((prev) => [...prev, letter]);
    } else if (letter !== "" && almost) {
      setAlmostKeys((prev) => [...prev, letter]);
    } else if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  const darkState = darkMode ? "dark-letter" : "light-letter"

  return (
    <div className={darkState} id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
