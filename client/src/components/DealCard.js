import React from "react";

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
      <p>{deal.deal_amount}</p>
      <p>Company - {deal.contact.company}</p>
      <p>Contact - {deal.contact.name}</p>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default DealCard;
