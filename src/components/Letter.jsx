import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currentAttempt, disabledLetters, setDisabledLetters, highContrast } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currentAttempt.attempt > attemptVal &&
    (correct && !highContrast ? "correct" : almost && !highContrast ? "almost" : correct && highContrast ? "correct-contrast" : almost && highContrast ? "almost-contrast" : "error");

    useEffect(() => {
      if (letter !== "" && !correct && !almost){
        setDisabledLetters((prev) => [...prev, letter])
      }
    }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
