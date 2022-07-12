import React from "react";
import DealCard from "./DealCard";

const DealsList = ({ deals, getDeals }) => {
  return (
    <div>
      {deals.map((deal) => {
        return <DealCard key={deal.id} deal={deal} getDeals={getDeals} />;
      })}
    </div>
  );
};

export default DealsList;
