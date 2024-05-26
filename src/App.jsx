import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault } from "./Words";
import { generateWordSet } from "./Words";
import GameOver from "./components/GameOver";
import Navbar from "./components/Navbar";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])

  const [correctKeys, setCorrectKeys] = useState([])
  const [almostKeys, setAlmostKeys] = useState([])

  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [correctWord, setCorrectWord] = useState('')
  const [highContrast, setHighContrast] = useState(true)


  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++){
      currWord += board[currentAttempt.attempt][i]
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({attempt: currentAttempt.attempt + 1, letterPos: 0})
    } else {
      alert('Word Not On List')
    }

    if (currWord.toLowerCase() === correctWord){
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    if (currentAttempt.attempt === 5 && wordSet.has(currWord.toLowerCase())){
      setGameOver({gameOver: true, guessedWord: false})
      return;
    }

    

  };


  return (
    <div className="App">
      <Navbar />
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
          highContrast,
          setHighContrast,
          correctKeys,
          setCorrectKeys,
          almostKeys,
          setAlmostKeys,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
