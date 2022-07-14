import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/contactsPage.css";

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
      <div className="contact-page__section">
        <div className="left">
          <img src={contact.image_url} alt={contact.image_url} />
        </div>
        <div className="right">
          <h1>{contact.name}</h1>
          <p>{contact.email}</p>
          <p>{contact.lifecycle_stage}</p>
          <p>{contact.job_title}</p>
          <p>{contact.company}</p>
        </div>
      </div>

      <h2>Deals</h2>
      <div className="contact-page_deal-wrap">
        {contact.deals.map((deal) => {
          return (
            <div className="contact-page_deal-card">
              <h3>{deal.deal_name}</h3>
              <p>{deal.deal_stage}</p>
              <p>{"$" + deal.amount.toLocaleString()}</p>

              <Link to={`/dashboard/deals/${deal.id}`}>
                <button>Deal Details</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContactsPage;
