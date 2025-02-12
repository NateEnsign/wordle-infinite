import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import axios from 'axios';

import { AppContext } from "../App";

import "./AuthModal.css";

Modal.setAppElement("#root");

const AuthModal = ({
  closeAuthModal,
  authModalOpen,
  isLoginMode,
  setIsLoginMode,
  nameInput,
  setNameInput,
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  submitAttempt,
  setSubmitAttempt,
  loginError,
  setLoginError
}) => {
  const { darkMode, setIsLoggedIn, setUserId, userId } = useContext(AppContext);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameInput(value);
    if (!isLoginMode && value.trim().length < 1) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailInput(value);
    if (!value.includes("@") || !value.includes(".")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordInput(value);
    if (value.trim().length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const validateInputs = () => {
    let isValid = true;
    const errors = [];

    if (!isLoginMode && nameInput.trim().length < 1) {
      setNameError(true);
      errors.push("Name is required.");
      isValid = false; 
    } else {
      setNameError(false);
    }

    if (!emailInput.includes("@") || !emailInput.includes(".")) {
      setEmailError(true);
      errors.push("Please add a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (passwordInput.trim().length < 6) {
      setPasswordError(true);
      errors.push("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    }
    return isValid;
  };

  // const handleLogin = () => {
  //   console.log(
  //     `Logged in with email: ${emailInput} and password: ${passwordInput}`
  //   );
  //   setIsLoggedIn(true);
  //   setNameInput("");
  //   setEmailInput("");
  //   setPasswordInput("");
  //   closeAuthModal();
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: emailInput,
        password: passwordInput
      });
      setUserId(response.data.user.id)
      
      console.log('User signed up successfully:', response.data);
      setIsLoggedIn(true);
      setNameInput("");
      setEmailInput("");
      setPasswordInput("");
      closeAuthModal();
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
      setLoginError(error.response && error.response.data ? error.response.data.message : 'An error occured, please try again.')
    }
  };


  // const handleSignup = () => {
  //   console.log(
  //     `Signed up with name: ${nameInput}, email: ${emailInput} and password: ${passwordInput}`
  //   );
  //   setIsLoggedIn(true);
  //   setNameInput("");
  //   setEmailInput("");
  //   setPasswordInput("");
  //   closeAuthModal();
  // };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        name: nameInput,
        email: emailInput,
        password: passwordInput
      });
      setUserId(response.data.user.id)
      
      console.log('User signed up successfully:', response.data);
      setIsLoggedIn(true);
      setNameInput("");
      setEmailInput("");
      setPasswordInput("");
      closeAuthModal();
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempt(true);
    if (validateInputs()) {
      if (isLoginMode) {
        handleLogin(emailInput, passwordInput);
      } else {
        handleSignup(nameInput, emailInput, passwordInput);
      }
    }
  };

  const toggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
    setLoginError('');
  }

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
          <form className="auth-form-inputs" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <input
                type="text"
                placeholder="Name"
                style={{
                  border: nameError && submitAttempt ? "1px solid red" : "",
                }}
                className={!darkMode ? "auth-input" : "auth-input-dark"}
                value={nameInput}
                onChange={handleNameChange}
              />
            )}
            <input
              type="text"
              placeholder="Email"
              style={{
                border: emailError && submitAttempt ? "1px solid red" : "",
              }}
              className={!darkMode ? "auth-input" : "auth-input-dark"}
              value={emailInput}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              style={{
                border: passwordError && submitAttempt ? "1px solid red" : "",
              }}
              className={!darkMode ? "auth-input" : "auth-input-dark"}
              value={passwordInput}
              onChange={handlePasswordChange}
            />
            <button
              className={darkMode ? "login-btn-dark" : "login-btn-light"}
              type="submit"
            >
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </button>
          </form>
          {loginError && <p>{loginError}</p>}
          <button
            className={!darkMode ? "toggle-mode-btn" : "toggle-mode-btn-dark"}
            onClick={ toggleLoginMode }
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
