import React, { useState } from "react";
import "../styles/addNoteModal.css";

const AddNoteModal = ({ deal, getDeal }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");

  const closeModalHandler = () => {
    document.querySelector(".addNoteModal").style.display = "none";
    document.getElementById("lightBoxBg").style.display = "none";
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: noteTitle,
        details: noteDetails,
        deal_id: deal.id,
      }),
    }).then((r) => {
      if (r.ok) {
        e.target.reset();
        r.json();
      }
      getDeal();
    });
  }

  return (
    <div className="addNoteModal">
      <h1>Add a note!</h1>
      <form onSubmit={handleSubmit}>
        <label>Note Title</label>
        <input
          type="text"
          id="noteTitle"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <label>Details</label>
        <input
          type="text"
          id="noteDetails"
          value={noteDetails}
          onChange={(e) => setNoteDetails(e.target.value)}
        />
        <button type="submit">Add Note!</button>
      </form>
      <button onClick={closeModalHandler}>close</button>
    </div>
  );
};

export default AddNoteModal;
