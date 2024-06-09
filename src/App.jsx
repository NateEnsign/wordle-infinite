import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault } from "./Words";
import { generateWordSet } from "./Words";
// import GameOver from "./components/GameOver";
import Navbar from "./components/Navbar";
import SettingsModal from "./components/SettingsModal";
import Swal from "sweetalert2";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);

  const [correctKeys, setCorrectKeys] = useState([]);
  const [almostKeys, setAlmostKeys] = useState([]);
  const [disabledHard, setDisabledHard] = useState(false);

  // const [gameOver, setGameOver] = useState({
  //   gameOver: false,
  //   guessedWord: false,
  // });
  const [correctWord, setCorrectWord] = useState("");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem("contrastState");
    return savedContrast !== null ? JSON.parse(savedContrast) : false;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedLightMode = localStorage.getItem("lightState");
    return savedLightMode !== null ? JSON.parse(savedLightMode) : true;
  });

  const [hardMode, setHardMode] = useState(() => {
    const savedHard = localStorage.getItem("hardState");
    return savedHard !== null ? JSON.parse(savedHard) : false;
  });

  const [onScreenOnly, setOnScreenOnly] = useState(() => {
    const savedKeyboardMode = localStorage.getItem("keyboardState");
    return savedKeyboardMode !== null ? JSON.parse(savedKeyboardMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("contrastState", JSON.stringify(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem("lightState", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("hardState", JSON.stringify(hardMode));
  }, [hardMode]);

  useEffect(() => {
    localStorage.setItem("keyboardState", JSON.stringify(onScreenOnly));
  }, [onScreenOnly]);

  const handleChangeLightMode = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleChangeContrast = (event) => {
    setHighContrast(event.target.checked);
  };

  const handleChangeHardMode = (event) => {
    if (currentAttempt.attempt > 0) {
      Swal.fire({
        text: "Can only change at start of round",
        showConfirmButton: null,
        timer: 1500,
        backdrop: false,
        width: "300px",
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        MarginBottom: 0,
        position: "top",

        willOpen: () => {
          const swalPopup = document.querySelector(".swal2-popup");
          if (swalPopup) {
            swalPopup.style.top = "50px";
          }
        },
      });
      return;
    }
    setHardMode(event.target.checked);
  };

  const handleChangeKeyboardMode = (event) => {
    setOnScreenOnly(event.target.checked);
  };

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      // setCorrectWord('olloo')
    });
  }, []);

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
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }

    if (!wordSet.has(currWord.toLowerCase())) {
      Swal.fire({
        text: "Word not on list",
        showConfirmButton: null,
        timer: 1000,
        backdrop: false,
        width: "190px",
        position: "top",
        padding: 0,
        customClass: {
          popup: 'popup-container',
          htmlContainer: 'popup-text'
        },

        willOpen: () => {
          const swalPopup = document.querySelector(".swal2-popup");
          if (swalPopup) {
            swalPopup.style.top = "50px";
          }
        },
      });
      return;
    }

    if (hardMode) {
      const containsAllCorrectKeys = correctKeys.every((key) =>
        currWord.toLowerCase().includes(key.toLowerCase())
      );
      const containsAllAlmostKeys = almostKeys.every((key) =>
        currWord.toLowerCase().includes(key.toLowerCase())
      );

      if (!containsAllCorrectKeys || !containsAllAlmostKeys) {
        Swal.fire({
          text: "Must use all revealed hints in guess",
          showConfirmButton: null,
          timer: 1500,
          backdrop: false,
          width: "300px",
          position: "top",
          padding: 0,
          customClass: {
            popup: 'popup-container',
            htmlContainer: 'popup-text'
          },
          willOpen: () => {
            const swalPopup = document.querySelector(".swal2-popup");
            if (swalPopup) {
              swalPopup.style.top = "50px";
            }
          },
        });
        return;
      }
    }

    setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
    setDisabledHard(true);

    if (currWord.toLowerCase() === correctWord) {
      Swal.fire({
        text: "Teriffic!",
        showConfirmButton: null,
        // timer: 1500,
        backdrop: false,
        width: "115px",
        position: "top",
        padding: 0,
        customClass: {
          popup: 'popup-container',
          htmlContainer: 'popup-text'
        },
        willOpen: () => {
          const swalPopup = document.querySelector(".swal2-popup");
          if (swalPopup) {
            swalPopup.style.top = "50px";
          }
        },
      });
      return;
      // setGameOver({ gameOver: true, guessedWord: true });
      // return;
    }

    if (currentAttempt.attempt === 5 && wordSet.has(currWord.toLowerCase())) {
      Swal.fire({
        text: `${correctWord}`.toUpperCase(),
        showConfirmButton: null,
        // timer: 1500,
        backdrop: false,
        width: 'auto',
        position: "top",
        padding: 0,
        customClass: {
          popup: 'popup-container',
          htmlContainer: 'popup-text'
        },
        willOpen: () => {
          const swalPopup = document.querySelector(".swal2-popup");
          if (swalPopup) {
            swalPopup.style.top = "50px";
          }
        },
      });
      return;
      // setGameOver({ gameOver: true, guessedWord: false });
      // return;
    }
  };

  const lightState = darkMode ? "app-dark" : "app-light";

  return (
    <div className={lightState}>
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
          // gameOver,
          // setGameOver,
          highContrast,
          setHighContrast,
          correctKeys,
          setCorrectKeys,
          almostKeys,
          setAlmostKeys,
          handleChangeContrast,
          handleChangeLightMode,
          darkMode,
          hardMode,
          handleChangeHardMode,
          handleChangeKeyboardMode,
          onScreenOnly,
          disabledHard,
        }}
      >
        <Navbar />
        <div className="game">
          <Board />
          <Keyboard />
        </div>
        <SettingsModal
          settingsModalOpen={settingsModalOpen}
          closeSettingsModal={() => setSettingsModalOpen(false)}
        />
      </AppContext.Provider>
    </div>
  );
}

export default App;
