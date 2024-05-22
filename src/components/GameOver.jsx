import React, { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, setGameOver, correctWord, currentAttempt } =
    useContext(AppContext);
  return (
    <div className="GameOver">
      <h3>{gameOver.guessedWord ? "You Correctly Guessed The Word" : "You failed to guess the word"}</h3>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3> You guessed in {currentAttempt.attempt} attempts</h3>
      )}
    </div>
  );
};

export default GameOver;
