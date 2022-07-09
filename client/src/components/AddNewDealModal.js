import React from "react";
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
