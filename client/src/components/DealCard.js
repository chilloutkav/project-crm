import React, { useState } from "react";
import EditDealForm from "./EditDealForm";

const DealCard = ({ deal, getDeals }) => {
  const [showEdit, setShowEdit] = useState(true);

  function editButtonHandler() {
    setShowEdit(!showEdit);
  }

  const handleDelete = () => {
    fetch(`/deals/${deal.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        getDeals();
      } else {
        r.json().then((err) => alert(err.errors));
      }
    });
  };

  return (
    <>
      <h4>{deal.deal_name}</h4>
      <p>{deal.deal_stage}</p>
      <p>{"$" + deal.amount.toLocaleString()}</p>
      <p>Company - {deal.contact.company}</p>
      <p>Contact - {deal.contact.name}</p>
      {<button onClick={editButtonHandler}>Edit Deal</button>}
      {showEdit ? null : <EditDealForm id={deal.id} getDeals={getDeals} />}
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default DealCard;
