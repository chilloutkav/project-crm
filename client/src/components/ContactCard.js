import React from "react";
import { Link } from "react-router-dom";
import "../styles/contactCard.css";

const ContactCard = ({ contact }) => {
  return (
    <div className="contact__contact-card">
      <h4>{contact.name}</h4>
      {/* <img src={contact.image_url} alt={contact.image_url} /> */}
      <p>
        {contact.job_title} - {contact.company}
      </p>
      <p className="contact__contact-card__email">
        <Link to={"@" + contact.email}>{contact.email}</Link>
      </p>
      <Link to={`/dashboard/contacts/${contact.id}`}>
        <button>Details</button>
      </Link>
    </div>
  );
};

export default ContactCard;
