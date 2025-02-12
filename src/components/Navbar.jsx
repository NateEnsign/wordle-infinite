import React, { useState, useContext } from "react";
// import { NavLink } from "react-router-dom";

import { CircleHelp } from "lucide-react";
import { BarChart2 } from "lucide-react";
import { Settings } from "lucide-react";
import QuestionModal from "./QuestionModal";
import SettingsModal from "./SettingsModal";
import AuthModal from "./AuthModal";

import { AppContext } from "../App";

import "./Navbar.css";

const Navbar = () => {
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [loginError, setLoginError] = useState('');

  const { darkMode, authModalOpen, setAuthModalOpen, isLoggedIn, setIsLoggedIn, setUserId } =
    useContext(AppContext);

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

  const openAuthModal = () => {
    setAuthModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setEmailInput("");
    setPasswordInput("");
    setNameInput('');
    setSubmitAttempt(false);
    setLoginError('');
    document.body.style.overflow = "auto";
  };

  const handleLogout = () => {
    setUserId(null);
    setIsLoggedIn(false);

  }

  const navState = darkMode ? "nav-dark" : "nav-light";

  return (
    <nav className={navState}>
      <div className="nav-left">
        <button onClick={openQuestionModal}>
          <CircleHelp className="nav-icon" />
        </button>
        <QuestionModal
          closeQuestionModal={closeQuestionModal}
          questionModalOpen={questionModalOpen}
        />
        <button>
          <BarChart2 className="nav-barChart" />
        </button>
        <button>
          <Settings className="nav-icon" onClick={openSettingsModal} />
        </button>
        <SettingsModal
          settingsModalOpen={settingsModalOpen}
          closeSettingsModal={closeSettingsModal}
        />
      </div>
      <div className="nav-middle">
        <h1>Wordle</h1>
      </div>
      <div className="nav-right">
        {!isLoggedIn ? (
          <button onClick={openAuthModal}>
            <h3>Login</h3>
          </button>
        ) : (
          <div className="nav-right-loggedin">
              <h3>Wecome Name</h3>
            <button onClick={handleLogout}>
              <p className="logout-btn">Log Out</p>
            </button>
          </div>
        )}
        <AuthModal
          closeAuthModal={closeAuthModal}
          authModalOpen={authModalOpen}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
          nameInput={nameInput}
          setNameInput={setNameInput}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          submitAttempt={submitAttempt}
          setSubmitAttempt={setSubmitAttempt}
          loginError={loginError}
          setLoginError={setLoginError}
        />
      </div>
    </nav>
  );
};

export default Navbar;
