import React, { useState } from "react";

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
        getNote();
      } else {
        r.json().then((err) => alert(err.errors));
      }
    });
    getDeal();
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.details}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NotesCard;
