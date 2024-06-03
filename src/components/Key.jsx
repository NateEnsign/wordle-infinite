import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled, almost, correct }) => {
  const { onSelectLetter, onDelete, onEnter, highContrast, darkMode } =
    useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "<Delete />") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  let keyState = darkMode ? "key-dark" : "key-light"

  return (
    <div
      className={keyState}
      id={
        bigKey
          ? "big"
          : disabled && darkMode
          ? "disabled-dark"
          : disabled && !darkMode
          ? "disabled-light"
          : correct && !highContrast && darkMode
          ? "correct-dark"
          : correct && !highContrast && !darkMode
          ? "correct-light"
          : correct && highContrast
          ? "correct-contrast"
          : almost && !highContrast && darkMode
          ? "almost-dark"
          : almost && !highContrast && !darkMode
          ? "almost-light"
          : almost && highContrast
          ? "almost-contrast"
          : ""
      }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
