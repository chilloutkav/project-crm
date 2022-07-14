import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AddDealModal from "./AddDealModal";
import AddNoteModal from "./AddNoteModal";
import EditDealForm from "./EditDealForm";
import NotesCard from "./NotesCard";
import "../styles/dealPage.css";

const DealPage = () => {
  const [deal, setDeal] = useState({ notes: [], contact: [], amount: "" });
  const [showEdit, setShowEdit] = useState(true);
  const { id } = useParams();

  function editButtonHandler() {
    setShowEdit(!showEdit);
  }

  const addNoteModal = () => {
    document.querySelector(".addNoteModal").style.display = "flex";
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
    <div className="deal-page">
      <h1>{deal.deal_name}</h1>
      <p>{deal.deal_stage}</p>
      <p>{"$" + deal.amount.toLocaleString()}</p>
      <Link to={`/dashboard/contacts/${deal.contact.id}`}>
        <p>
          {deal.contact.name} - {deal.contact.job_title}
        </p>
      </Link>

      <p>{deal.contact.company}</p>
      {<button onClick={editButtonHandler}>Edit Deal</button>}
      {showEdit ? null : <EditDealForm id={deal.id} getDeal={getDeal} />}
      <h2>Notes</h2>
      <button onClick={addNoteModal}>Add New Note</button>
      <AddNoteModal deal={deal} getDeal={getDeal} />

      <div className="notes-card-wrapper">
        {deal.notes.map((note) => {
          return (
            <div>
              <NotesCard note={note} amount={deal.amount} getDeal={getDeal} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DealPage;
