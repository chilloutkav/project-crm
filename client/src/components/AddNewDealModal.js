import React from "react";
import { useLinkClickHandler } from "react-router-dom";
import "../styles/addNewDeal.css";

const AddNewDealModal = () => {
  const closeModalHandler = () => {
    document.querySelector(".addNewDeal").style.display = "none";
    document.getElementById("lightBoxBg").style.display = "none";
  };

  return (
    <div className="addNewDeal">
      AddNewDealModal
      <button onClick={closeModalHandler}>close</button>
    </div>
  );
};

export default AddNewDealModal;

// Modal Displays with correct form when the button is clicked
