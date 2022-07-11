import React from "react";
import { Link } from "react-router-dom";

const DealCard = ({ deal, getDeals }) => {
  return (
    <>
      <h4>{deal.deal_name}</h4>
      <p>{deal.deal_stage}</p>
      <p>{"$" + deal.amount.toLocaleString()}</p>
      <p>Company - {deal.contact.company}</p>
      <p>Contact - {deal.contact.name}</p>
      <Link to={`/dashboard/deals/${deal.id}`}>
        <button>Details</button>
      </Link>
    </>
  );
};

export default DealCard;
