import React from "react";
import ContactCard from "./ContactCard";

const ContactsList = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact) => {
        return <ContactCard key={contacts.id} contact={contact} />;
      })}
    </div>
  );
};

export default ContactsList;
