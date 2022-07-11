import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact }) => {
  return (
    <>
      <h4>{contact.name}</h4>
      <p>
        {contact.job_title} - {contact.company}
      </p>
      <p>{contact.email}</p>
      <Link to={`/dashboard/contacts/${contact.id}`}>
        <button>Details</button>
      </Link>
    </>
  );
};

export default ContactCard;
