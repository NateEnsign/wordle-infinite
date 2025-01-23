import React, { useContext } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { AppContext } from "../App";

import './AuthModal.css';



Modal.setAppElement("#root");

const AuthModal = ({ authModalOpen, closeAuthModal }) => {
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
      isOpen={authModalOpen}
      onRequestClose={closeAuthModal}
      style={customStyles}
    
    >
      <div className="auth-modal-body">
        <div className="auth-btn-container">
          <button className="auth-btn" onClick={closeAuthModal}>
            <X className="auth-x" />
          </button>
        </div>
       <div className="auth-form-body">
        <h4>Login or Sign Up to track your stats!</h4>
        <form className="auth-form-inputs">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
        </form>
       </div>
      </div>
    </Modal>
  );
};

export default AuthModal;