import React, { useEffect, useCallback, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";
import { Delete } from 'lucide-react';
import Swal from "sweetalert2";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const { onEnter, onDelete, onSelectLetter, disabledLetters, correctKeys, almostKeys, onScreenOnly } =
    useContext(AppContext);

  const handleKeyboard = useCallback((event) => {
    if (onScreenOnly){
      Swal.fire({
        text: "Keyboard is disabled, please use on screen input. You can enable the use of keyboard in settings",
        showConfirmButton: null,
        timer: 3600,
        backdrop: false,
        width: "500px",
        position: 'top',
        padding: 0,
        willOpen: () => {
          const swalPopup = document.querySelector('.swal2-popup');
          if (swalPopup) {
            swalPopup.style.top = '50px';
          }
        }
      });
      return;
    }
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              correct={correctKeys.includes(key)}
              almost={almostKeys.includes(key)}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              correct={correctKeys.includes(key)}
              almost={almostKeys.includes(key)}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              correct={correctKeys.includes(key)}
              almost={almostKeys.includes(key)}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
        <Key keyVal={<Delete />} bigKey id='Delete' />
      </div>
    </div>
  );
};

export default Keyboard;
