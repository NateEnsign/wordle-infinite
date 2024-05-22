import React, { useState } from "react";
import { CircleHelp, X } from "lucide-react";
import { BarChart2 } from "lucide-react";
import { Settings } from "lucide-react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    overflow: "hidden",
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
    width: '470px',
    maxWidth: "80%",
    maxHeight: "85%",
    overflow: "auto",
  },
};

Modal.setAppElement("#root");

const Navbar = () => {
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  const openQuestionModal = () => {
    setQuestionModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeQuestionModal = () => {
    setQuestionModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <nav>
      <div className="nav-left">
        <button onClick={openQuestionModal}>
          <CircleHelp className="nav-icon" />
        </button>
        <Modal
          isOpen={questionModalOpen}
          onRequestClose={closeQuestionModal}
          style={customStyles}
        >
          <div style={{paddingLeft: '30px'}}>
            <div style={{textAlign: 'right'}}>
              <button onClick={closeQuestionModal} style={{ all: "unset" }}>
                <X
                  style={{
                    strokeWidth: "2.3px",
                    height: "28px",
                    width: "28px",
                  }}
                />
              </button>
            </div>
            <div>
              <h1>How To Play</h1>
              <h2 style={{fontWeight: 'normal'}}>Guess the Wordle in 6 tries.</h2>
            </div>
            <ul style={{paddingRight: '100px'}}>
              <li>Each guess must be a valid 5-letter word.</li>
              <li>
                The color of the tiles will change to show how close your guess
                was to the word.
              </li>
            </ul>
            <h3>Examples</h3>
            <div>
              <span>W</span>
              <span>E</span>
              <span>A</span>
              <span>R</span>
              <span>Y</span>
              <div>
                <span>W</span>
                <span> is in the word and in the correct spot.</span>
              </div>
            </div>
            <div>
              <span>P</span>
              <span>I</span>
              <span>L</span>
              <span>L</span>
              <span>S</span>
              <div>
                <span>I</span>
                <span> is in the word but in the wrong spot.</span>
              </div>
            </div>
            <div>
              <span>V</span>
              <span>A</span>
              <span>G</span>
              <span>U</span>
              <span>E</span>
              <div>
                <span>U</span>
                <span> is not in the word in any spot.</span>
              </div>
            </div>
          </div>
        </Modal>
        <button>
          <BarChart2 className="nav-barChart" />
        </button>
        <button>
          <Settings className="nav-icon" />
        </button>
      </div>
      <div className="nav-middle">
        <h1>Wordle</h1>
      </div>
      <div className="nav-right">
        <button>
          <h3>Login</h3>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
