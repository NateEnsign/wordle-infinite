import React, { useContext } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { AppContext } from "../App";



Modal.setAppElement("#root");

const QuestionModal = ({ questionModalOpen, closeQuestionModal }) => {
  const { highContrast, darkMode } = useContext(AppContext)

  const correctLetter = !highContrast && !darkMode ? "how-letter-green-light" : !highContrast ? "how-letter-green-dark" : "how-letter-orange";

  const almostLetter = !highContrast && !darkMode ? "how-letter-yellow-light" : !highContrast ? "how-letter-yellow-dark" : "how-letter-blue"

  const nonLetter = !darkMode ? "how-letter-grey-light" : "how-letter-grey-dark"

  const customStyles = darkMode ? {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      overflow: "hidden",
      zIndex: '1080',
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#121214",
      color: "#F8F8F8",
      border: "none",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "20px",
      height: "550px",
      width: "470px",
      maxWidth: "80%",
      maxHeight: "85%",
      overflow: "auto",
      // zIndex: '1080',
    },
  } : {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      overflow: "hidden",
      zIndex: '1080',
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      color: "#010101",
      border: "none",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "20px",
      height: "550px",
      width: "470px",
      maxWidth: "80%",
      maxHeight: "85%",
      overflow: "auto",
      // zIndex: '1080',
    },
  }

  return (
    <Modal
      isOpen={questionModalOpen}
      onRequestClose={closeQuestionModal}
      style={customStyles}
    
    >
      <div className="how-modal-body">
        <div className="how-btn-container">
          <button className="how-btn" onClick={closeQuestionModal}>
            <X className="how-x" />
          </button>
        </div>
        <div>
          <div className="how-title">How To Play</div>
          <div className="how-sm-title">Guess the Wordle in 6 tries.</div>
        </div>
        <ul className="how-list">
          <li className="how-list-item">
            Each guess must be a valid 5-letter word.
          </li>
          <li className="how-list-item">
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>
        <div className="how-examples-title">Examples</div>
        <div className="how-example">
          <div className="how-letter-container">
            <span className="how-letter" id={correctLetter}>
              W
            </span>
            <span className="how-letter">E</span>
            <span className="how-letter">A</span>
            <span className="how-letter">R</span>
            <span className="how-letter">Y</span>
          </div>
          <div>
            <span className="how-bold">W</span>
            <span> is in the word and in the correct spot.</span>
          </div>
        </div>
        <div className="how-example">
          <div className="how-letter-container">
            <span className="how-letter">P</span>
            <span className="how-letter" id={almostLetter}>
              I
            </span>
            <span className="how-letter">L</span>
            <span className="how-letter">L</span>
            <span className="how-letter">S</span>
          </div>
          <div>
            <span className="how-bold">I</span>
            <span> is in the word but in the wrong spot.</span>
          </div>
        </div>
        <div className="how-example">
          <div className="how-letter-container">
            <span className="how-letter">V</span>
            <span className="how-letter">A</span>
            <span className="how-letter">G</span>
            <span className="how-letter" id={nonLetter}>
              U
            </span>
            <span className="how-letter">E</span>
          </div>
          <div>
            <span className="how-bold">U</span>
            <span> is not in the word in any spot.</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;

