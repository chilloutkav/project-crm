import React, { useState } from "react";
import { Link } from "react-router-dom";

const DealCard = ({ deal, getDeals }) => {
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
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/dashboard/deals/${deal.id}`}>
        <button>Details</button>
      </Link>
    </>
  );
};

export default DealCard;
