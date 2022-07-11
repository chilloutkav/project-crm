import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ContactsPage = () => {
  const [contact, setContact] = useState({ deals: [], notes: [] });
  const { id } = useParams();

  const getContact = () => {
    fetch(`/contacts/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setContact(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getContact();
  }, []);

  console.log(contact);

  return (
    <>
      <h1>{contact.name}</h1>
      <p>{contact.email}</p>
      <p>{contact.lifecycle_stage}</p>
      <p>{contact.job_title}</p>
      <p>{contact.company}</p>
      <h2>Deals</h2>
      {contact.deals.map((deal) => {
        return (
          <div>
            <h3>{deal.deal_name}</h3>
            <p>{deal.deal_stage}</p>
            <p>{"$" + deal.amount.toLocaleString()}</p>
            <Link to={`/dashboard/deals/${deal.id}`}>Deal Details</Link>
          </div>
        );
      })}
    </>
  );
};

export default ContactsPage;
