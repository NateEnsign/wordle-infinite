import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled, almost, correct }) => {
  const {
    onSelectLetter,
    onDelete,
    onEnter,
    highContrast
  } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div className="key" id={bigKey ? "big" : disabled ? "disabled" : correct && !highContrast ? "correct" : correct && highContrast ? "correct-contrast" : almost && !highContrast ? "almost" : almost && highContrast ? "almost-contrast" : ''} onClick={selectLetter}>
      {keyVal}
    </div>
  );
};

export default Key;
