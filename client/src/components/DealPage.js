import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DealsContainer from "./DealsContainer";

const DealPage = () => {
  const [deal, setDeal] = useState({ notes: [], contact: [], amount: "" });
  const { id } = useParams();

  const getDeal = () => {
    fetch(`/deals/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setDeal(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDeal();
  }, []);

  console.log(deal);

  return (
    <>
      <h1>{deal.deal_name}</h1>
      <p>{deal.deal_stage}</p>
      <p>{"$" + deal.amount.toLocaleString()}</p>
      <p>{deal.contact.name}</p>
      <h2>Notes</h2>
      {deal.notes.map((note) => {
        return (
          <div>
            <h3>{note.title}</h3>
            <p>{note.details}</p>
            <p>{"$" + deal.amount.toLocaleString()}</p>
          </div>
        );
      })}
    </>
  );
};

export default DealPage;
