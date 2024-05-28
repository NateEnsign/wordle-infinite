import React, { useState } from "react";
import { CircleHelp, X } from "lucide-react";
import { BarChart2 } from "lucide-react";
import { Settings } from "lucide-react";
import Modal from "react-modal";
import QuestionModal from "./QuestionModal";

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
    width: "470px",
    maxWidth: "80%",
    maxHeight: "85%",
    overflow: "auto",
  },
};

Modal.setAppElement("#root");

const Navbar = () => {
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const openSettingsModal = () => {
    setSettingsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
    document.body.style.overflow = "auto";
  };

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
        <QuestionModal
          closeQuestionModal={closeQuestionModal}
          questionModalOpen={questionModalOpen}
          setQuestionModalOpen={setQuestionModalOpen}
        />
        <button>
          <BarChart2 className="nav-barChart" />
        </button>
        <button>
          <Settings className="nav-icon" onClick={openSettingsModal} />
        </button>
        <Modal
          isOpen={settingsModalOpen}
          onRequestClose={closeSettingsModal}
          style={customStyles}
        >
          <div className="settings-modal-body">
            <div className="settings-head">
              <div className="settings-title">SETTINGS</div>
              <div className="settings-btn-container">
                <button className="how-btn" onClick={closeSettingsModal}>
                  <X className="how-x" />
                </button>
              </div>
            </div>
            <div className="settings-options">
              <div className="settings-option">
                <div settings-option-left></div>
                <div className="settings-option-right"></div>
              </div>
              <div className="settings-option">
                <div settings-option-left></div>
                <div className="settings-option-right"></div>
              </div>
              <div className="settings-option">
                <div settings-option-left></div>
                <div className="settings-option-right"></div>
              </div>
              <div className="settings-option">
                <div settings-option-left></div>
                <div className="settings-option-right"></div>
              </div>
            </div>
          </div>
        </Modal>
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
