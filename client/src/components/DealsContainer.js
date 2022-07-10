import React, { useState, useEffect } from "react";
import DealCard from "./DealCard";
import AddNewDealModal from "./AddNewDealModal";
import "../styles/dealsContainer.css";

const DealsContainer = ({ user, deals, getDeals }) => {
  let newDealAmount = 0;
  let progressDealAmount = 0;
  let closedDealAmount = 0;

  const newDealsValue = (deals) => {
    let newDealAmount = 0;
    deals.filter((deal) => {
      if (
        deal.deal_stage.toLowerCase() === "appointment scheduled" ||
        deal.deal_stage.toLowerCase() === "qualified to buy"
      ) {
        newDealAmount += deal.amount;
        document.getElementById("new-deal-amount").innerHTML =
          "$" + newDealAmount.toLocaleString();
      }
    });
  };

  const inProgressValue = (deals) => {
    let progressDealAmount = 0;
    deals.filter((deal) => {
      if (
        deal.deal_stage.toLowerCase() === "presentation scheduled" ||
        deal.deal_stage.toLowerCase() === "decision maker brough-in" ||
        deal.deal_stage.toLowerCase() === "contract sent"
      ) {
        progressDealAmount += deal.amount;
        document.getElementById("in-progress-amount").innerHTML =
          "$" + progressDealAmount.toLocaleString();
      }
    });
  };

  const closedValue = (deals) => {
    let closedDealAmount = 0;
    deals.filter((deal) => {
      if (deal.deal_stage === "Closed Won") {
        closedDealAmount += deal.amount;
        document.getElementById("closed-amount").innerHTML =
          "$" + closedDealAmount.toLocaleString();
      }
    });
  };

  const modalHandler = () => {
    document.querySelector(".addNewDeal").style.display = "flex";
    document.getElementById("lightBoxBg").style.display = "flex";
  };

  newDealsValue(deals);
  inProgressValue(deals);
  closedValue(deals);

  return (
    <>
      <div>
        {<AddNewDealModal />}
        <div id="lightBoxBg"></div>
        <h1>Deals Overview</h1>
        <p>Please find your current deals below!</p>
        <h3>New Deals</h3>
        <p id="new-deal-amount">${newDealAmount}</p>
        <h3>In Progress</h3>
        <p id="in-progress-amount">${progressDealAmount}</p>
        <h3>Closed</h3>
        <p id="closed-amount">${closedDealAmount}</p>
      </div>
      <div>
        <h2>Deals</h2>
        {deals.map((deal) => {
          return <DealCard deal={deal} getDeals={getDeals} />;
        })}
      </div>
      <div>
        <button onClick={modalHandler}>Add New Deal</button>
      </div>
    </>
  );
};

export default DealsContainer;
