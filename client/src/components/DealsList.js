import React from "react";
import DealCard from "./DealCard";
import { EmptyState } from "./common";
import { ChartBarIcon } from "./icons";

const DealsList = ({ deals, getDeals }) => {
  if (deals.length === 0) {
    return (
      <EmptyState
        icon={<ChartBarIcon />}
        title="No deals found"
        description="Create your first deal to start tracking opportunities."
      />
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} getDeals={getDeals} />
        ))}
      </div>
    </div>
  );
};

export default DealsList;