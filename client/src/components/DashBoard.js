import React, { useEffect, useState } from "react";
import DealsContainer from "./DealsContainer";
import AddDealModal from "./AddDealModal";

const DashBoard = ({ user, modalHandler }) => {
  const [deals, setDeals] = useState([]);

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

  useEffect(() => {
    getDeals();
  }, []);

  console.log(user);
  return (
    <>
      <h1>Hello {user.first_name}</h1>

      <DealsContainer
        user={user}
        deals={deals}
        getDeals={getDeals}
        modalHandler={modalHandler}
      />
      <AddDealModal onAddDeal={onAddDeal} user={user} />
    </>
  );
};

export default DashBoard;
