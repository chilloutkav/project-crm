import React from "react";
import { Link } from "react-router-dom";
import "../styles/dealCard.css";

const DealCard = ({ deal, getDeals }) => {
  return (
    <div className="deal-card">
      <h4 className="deal-card__deal-name deal-card__deal-wrap">
        {deal.deal_name}
      </h4>
      <p className="deal-card__deal-stage deal-card__deal-wrap">
        {deal.deal_stage}
      </p>
      <p className="deal-card__deal-amount deal-card__deal-wrap">
        {"$" + deal.amount}
      </p>
      <p className="deal-card__deal-company deal-card__deal-wrap">
        Company - {deal.contact.company}
      </p>
      <p className="deal-card__deal-contact deal-card__deal-wrap">
        Contact - {deal.contact.name}
      </p>
      <Link to={`/dashboard/deals/${deal.id}`}>
        <button className="deal-card__deal-btn">Details</button>
      </Link>
    </div>
  );
};

export default DealCard;
