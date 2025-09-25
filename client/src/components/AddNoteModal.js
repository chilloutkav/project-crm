import React, { useState } from "react";
import "../styles/addNoteModal.css";
import { supabase } from "../supabaseClient";

const AddNoteModal = ({ deal, getDeal }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");

  const closeModalHandler = () => {
    document.querySelector(".addNoteModal").style.display = "none";
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title: noteTitle,
          details: noteDetails,
          deal_id: deal.id,
        }
      ])
      .select();

    if (error) {
      console.error('Error adding note:', error);
    } else {
      e.target.reset();
      closeModalHandler();
    }

    getDeal();
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
        <button id="add-note-btn" type="submit">
          Add Note!
        </button>
      </form>
      <button onClick={closeModalHandler}>close</button>
    </div>
  );
};

export default AddNoteModal;
