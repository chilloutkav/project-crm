import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddDealModal from "./AddDealModal";
import AddNoteModal from "./AddNoteModal";
import EditDealForm from "./EditDealForm";
import NotesCard from "./NotesCard";

const DealPage = () => {
  const [deal, setDeal] = useState({ notes: [], contact: [], amount: "" });
  const [showEdit, setShowEdit] = useState(true);
  const { id } = useParams();

  function editButtonHandler() {
    setShowEdit(!showEdit);
  }

  const addNoteModal = () => {
    document.querySelector(".addNoteModal").style.display = "flex";
    document.getElementById("lightBoxBg").style.display = "flex";
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
      <p>
        {deal.contact.name} - {deal.contact.job_title}
      </p>
      <p>{deal.contact.company}</p>
      {<button onClick={editButtonHandler}>Edit Deal</button>}
      {showEdit ? null : <EditDealForm id={deal.id} getDeal={getDeal} />}
      <h2>Notes</h2>
      <button onClick={addNoteModal}>Add New Note</button>
      <AddNoteModal deal={deal} getDeal={getDeal} />
      {deal.notes.map((note) => {
        return (
          <div>
            <NotesCard note={note} amount={deal.amount} getDeal={getDeal} />
          </div>
        );
      })}
    </>
  );
};

export default DealPage;
