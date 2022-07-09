import React from "react";

const DealCard = ({ deal }) => {
  return (
    <>
      <h4>{deal.deal_name}</h4>
      <p>{deal.deal_stage}</p>
      <p>{deal.deal_amount}</p>
      <p>Company - {deal.contact.company}</p>
      <p>Contact - {deal.contact.name}</p>
    </>
  );
};

export default DealCard;
