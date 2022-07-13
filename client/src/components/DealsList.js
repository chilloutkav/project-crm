import React from "react";
import DealCard from "./DealCard";
import "../styles/dealList.css";

const DealsList = ({ deals, getDeals }) => {
  return (
    <div className="deal-list">
      {deals.map((deal) => {
        return <DealCard key={deal.id} deal={deal} getDeals={getDeals} />;
      })}
    </div>
  );
};

export default DealsList;
