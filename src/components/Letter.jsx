import React, { useContext, useEffect, useState } from "react";
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
    darkMode,
    correctKeys,
    almostKeys,
  } = useContext(AppContext);

  const [isPulsing, setIsPulsing] = useState(false);

  const letter = board[attemptVal][letterPos];
  const correctWordArray = correctWord.toUpperCase().split("");

  const correctWordCount = correctWordArray.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  const guessCount = {};
  const almostCount = {};

  let isCorrect = false;
  let isAlmost = false;

  // First pass: Mark correct letters and count them
  for (let i = 0; i < 5; i++) {
    const guessedLetter = board[attemptVal][i];
    if (guessedLetter === correctWordArray[i]) {
      guessCount[guessedLetter] = (guessCount[guessedLetter] || 0) + 1;
    }
  }

  // Second pass: Mark almost letters
  for (let i = 0; i < 5; i++) {
    const guessedLetter = board[attemptVal][i];
    if (!guessCount[guessedLetter]) {
      guessCount[guessedLetter] = 0;
    }
    if (correctWordArray.includes(guessedLetter)) {
      const totalCorrectAndAlmost = (guessCount[guessedLetter] || 0) + (almostCount[guessedLetter] || 0);
      if (totalCorrectAndAlmost < correctWordCount[guessedLetter]) {
        if (guessedLetter !== correctWordArray[i]) {
          almostCount[guessedLetter] = (almostCount[guessedLetter] || 0) + 1;
          if (i === letterPos) {
            isAlmost = true;
          }
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
      : !isCorrect && !isAlmost && darkMode
      ? "error-dark"
      : "error-light");

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

    useEffect(() => {
      if (letter !== "") {
        setIsPulsing(true);
        const timer = setTimeout(() => setIsPulsing(false), 300); // Duration of the animation
        return () => clearTimeout(timer);
      }
    }, [letter]);

  useEffect(() => {
    if (letter !== "" && correct) {
      setCorrectKeys((prev) => [...prev, letter]);
    } else if (letter !== "" && almost) {
      setAlmostKeys((prev) => [...prev, letter]);
    } else if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  const darkState = darkMode ? "dark-letter" : "light-letter";

  return (
    <div className={`${darkState} ${isPulsing ? "pulsing-border" : ""}`} id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;


