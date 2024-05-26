import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {

  const { board, correctWord, currentAttempt, disabledLetters, setDisabledLetters, highContrast, correctKeys, setCorrectKeys, almostKeys, setAlmostKeys } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currentAttempt.attempt > attemptVal &&
    (correct && !highContrast ? "correct" : almost && !highContrast ? "almost" : correct && highContrast ? "correct-contrast" : almost && highContrast ? "almost-contrast" : "error");

    useEffect(() => {
      if (letter !== "" && correct){
        setCorrectKeys((prev) => [...prev, letter])
      } else if (letter !== "" && almost){
        setAlmostKeys((prev) => [...prev, letter])
      }
      else if (letter !== "" && !correct && !almost) {
        console.log(letter);
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
