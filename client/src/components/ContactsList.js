import React from "react";
import ContactCard from "./ContactCard";
import "../styles/contactList.css";

const ContactsList = ({ contacts }) => {
  return (
    <div className="contact-list-card">
      {contacts.map((contact) => {
        return <ContactCard key={contacts.id} contact={contact} />;
      })}
    </div>
  );
};

export default ContactsList;
