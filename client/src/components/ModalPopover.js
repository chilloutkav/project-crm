import React from "react";
import "../styles/modalPopover.css";
import AddContactForm from "./AddContactForm";

const ModalPopover = ({ user }) => {
  const closeModalHandler = () => {
    document.querySelector(".modalPopover").style.display = "none";
  };

  return (
    <div className="modalPopover">
      <h1>From ModalPopover Component</h1>
      <button onClick={closeModalHandler}>close</button>
    </div>
  );
};

export default ModalPopover;

// Modal Displays with correct form when the button is clicked
