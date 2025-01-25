import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { AppContext } from "../App";

import "./AuthModal.css";

Modal.setAppElement("#root");

const AuthModal = ({closeAuthModal, authModalOpen}) => {
  const { darkMode } = useContext(AppContext);

  // State to toggle between login and signup modes
  const [isLoginMode, setIsLoginMode] = useState(true);


  const customStyles = darkMode
    ? {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          overflow: "hidden",
          zIndex: "1080",
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
      }
    : {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          overflow: "hidden",
          zIndex: "1080",
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
        },
      };

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
        <div className={!darkMode ? "auth-form-body" : "auth-form-body-dark"}>
          <h3 className="auth-form-header">
            Must be logged in to track stats!
          </h3>
          <form className="auth-form-inputs">
            {!isLoginMode && (
              <input
                type="text"
                placeholder="Name"
                className={!darkMode ? "auth-input" : "auth-input-dark"}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className={!darkMode ? "auth-input" : "auth-input-dark"}
            />
            <input
              type="password"
              placeholder="Password"
              className={!darkMode ? "auth-input" : "auth-input-dark"}
            />
            <button className={darkMode ? "login-btn-dark" : "login-btn-light"}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </button>
          </form>
          <button
            className={!darkMode ? "toggle-mode-btn" : "toggle-mode-btn-dark"}
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
