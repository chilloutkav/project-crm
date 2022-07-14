import React, { useState } from "react";
import "../styles/notesCard.css";

const NotesCard = ({ note, getDeal }) => {
  const [updatedNote, setUpdatedNote] = useState({});

  const getNote = () => {
    fetch(`/notes/${note.id}`)
      .then((response) => response.json())
      .then((response) => {
        setUpdatedNote(response);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    fetch(`/notes/${note.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        getDeal();
      } else {
        r.json().then((err) => alert(err.errors));
      }
    });
  };

  return (
    <div className="notes-card">
      <h3>{note.title}</h3>
      <p>{note.details}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NotesCard;
