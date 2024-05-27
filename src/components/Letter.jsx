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
  } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  // Create an array from the correct word
  const correctWordArray = correctWord.toUpperCase().split('');

  // Count occurrences of each letter in the correct word
  const correctWordCount = correctWordArray.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  // Track occurrences of correct and almost letters in the guess
  const guessCount = {};
  for (let i = 0; i < 5; i++) {
    const guessedLetter = board[attemptVal][i];
    if (correctWordArray[i] === guessedLetter) {
      guessCount[guessedLetter] = (guessCount[guessedLetter] || 0) + 1;
    }
  }

  let isCorrect = correctWord.toUpperCase()[letterPos] === letter;
  let isAlmost = !isCorrect && letter !== "" && correctWordArray.includes(letter) && 
    (guessCount[letter] || 0) < (correctWordCount[letter] || 0);

  if (isCorrect) {
    guessCount[letter] = (guessCount[letter] || 0) + 1;
  }

  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const almost = !correct &&
    letter !== "" &&
    correctWord.toUpperCase().includes(letter);

  const letterState =
    currentAttempt.attempt > attemptVal &&
    (isCorrect && !highContrast
      ? "correct"
      : isAlmost && !highContrast
      ? "almost"
      : isCorrect && highContrast
      ? "correct-contrast"
      : isAlmost && highContrast
      ? "almost-contrast"
      : "error");

      useEffect(() => {
        if (letter !== "" && correct) {
          setCorrectKeys((prev) => [...prev, letter]);
        } else if (letter !== "" && almost) {
          setAlmostKeys((prev) => [...prev, letter]);
        } else if (letter !== "" && !correct && !almost) {
          setDisabledLetters((prev) => [...prev, letter]);
        }
      }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;


