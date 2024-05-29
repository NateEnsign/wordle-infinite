import React, { useContext } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import SettingsSwitch from "./SettingsSwitch";
import { AppContext } from "../App";

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

const SettingsModal = ({ settingsModalOpen, closeSettingsModal }) => {
  const { highContrast, handleChangeContrast } = useContext(AppContext);

  return (
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
            <div className="settings-option-left">
              <div>Hard Mode</div>
              <div>Any revealed hints must be used in subsequent guesses</div>
            </div>
            <div className="settings-option-right">
              <SettingsSwitch />
            </div>
          </div>
          <hr />
          <div className="settings-option">
            <div className="settings-option-left">
              <div>Dark Theme</div>
            </div>
            <div className="settings-option-right">
              <SettingsSwitch />
            </div>
          </div>
          <hr />
          <div className="settings-option">
            <div className="settings-option-left">
              <div>High Contrast Mode</div>
              <div>Contrast and colorblindness improvements</div>
            </div>
            <div className="settings-option-right">
              <SettingsSwitch
                checked={highContrast}
                onChange={handleChangeContrast}
              />
            </div>
          </div>
          <hr />
          <div className="settings-option">
            <div className="settings-option-left">
              <div>Onscreen Keyboard Input Only</div>
              <div>
                Ignore key input except from the onscreen keyboard. Most helpful
                for users using speeach recognition or other assistive devices
              </div>
            </div>
            <div className="settings-option-right">
              <SettingsSwitch />
            </div>
          </div>
          <hr />
          <div className="settings-option">
            <div className="settings-option-left">
              <div>Feedback</div>
            </div>
            <div className="settings-option-right">Email</div>
          </div>
          <hr />
          <div className="settings-option">
            <div className="settings-option-left">
              <div>Report a Bug</div>
            </div>
            <div className="settings-option-right">Email</div>
          </div>
          <hr />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
