import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditDealForm from "./EditDealForm";

const DealPage = () => {
  const [deal, setDeal] = useState({ notes: [], contact: [], amount: "" });
  const [showEdit, setShowEdit] = useState(true);
  const { id } = useParams();

  function editButtonHandler() {
    setShowEdit(!showEdit);
  }

  const handleDelete = () => {
    fetch(`/deals/${deal.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        getDeal();
      } else {
        r.json().then((err) => alert(err.errors));
      }
    });
  };

  const getDeal = () => {
    fetch(`/deals/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setDeal(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDeal();
  }, []);

  console.log(deal);

  return (
    <>
      <h1>{deal.deal_name}</h1>
      <p>{deal.deal_stage}</p>
      <p>{"$" + deal.amount.toLocaleString()}</p>
      <p>{deal.contact.name}</p>
      {<button onClick={editButtonHandler}>Edit Deal</button>}
      {showEdit ? null : <EditDealForm id={deal.id} getDeal={getDeal} />}
      <h2>Notes</h2>
      {deal.notes.map((note) => {
        return (
          <div>
            <h3>{note.title}</h3>
            <p>{note.details}</p>
            <p>{"$" + deal.amount.toLocaleString()}</p>

            <button onClick={handleDelete}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

export default DealPage;
