import React, { useState, useEffect } from "react";
import DealsList from "./DealsList";
import "../styles/dealsContainer.css";
import DealSearch from "./DealSearch";
import AddDealModal from "./AddDealModal";

const DealsContainer = ({ user }) => {
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onAddDeal = (newDeal) => {
    const displayedDeals = [...deals, newDeal];
    setDeals(displayedDeals);
  };

  const getDeals = () => {
    fetch("/deals")
      .then((response) => response.json())
      .then((response) => {
        setDeals(
          response.filter((deal) => {
            if (deal.user.id === user.id) return deals;
          })
        );
      })
      .catch((error) => console.log(error));
  };

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

  const addDealModal = () => {
    document.querySelector(".addDealModal").style.display = "flex";
    document.getElementById("lightBoxBg").style.display = "flex";
  };

  const displayedDeals = deals.filter((deal) => {
    return deal.deal_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    getDeals();
  }, []);

  newDealsValue(deals);
  inProgressValue(deals);
  closedValue(deals);

  return (
    <>
      <div>
        <div id="lightBoxBg"></div>
        <h1>Deals Overview</h1>
        <p>Please find your current deals below!</p>
        <div className="deals-overview">
          <div>
            <h3>New Deals</h3>
            <p id="new-deal-amount">${newDealAmount}</p>
          </div>
          <div>
            <h3>In Progress</h3>
            <p id="in-progress-amount">${progressDealAmount}</p>
          </div>
          <div>
            <h3>Closed</h3>
            <p id="closed-amount">${closedDealAmount}</p>
          </div>
        </div>
      </div>
      <div className="add-search-wrapper">
        <h2>Deals</h2>
        <div>
          <button onClick={addDealModal}>Add New Deal</button>
          <AddDealModal user={user} onAddDeal={onAddDeal} />
          <DealSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>
      <DealsList deals={displayedDeals} getDeals={getDeals} />
    </>
  );
};

export default DealsContainer;
