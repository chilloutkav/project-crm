import React, { useEffect, useState } from "react";
import AddContactForm from "./AddContactForm";
import { Link } from "react-router-dom";
import "../styles/dealsContainer.css";
import ContactCard from "./ContactCard";

const ContactsContainer = ({ user }) => {
  const [contacts, setContacts] = useState([]);

  const onAddContact = (newContact) => {
    const displayedContacts = [...contacts, newContact];
    setContacts(displayedContacts);
  };

  const getContacts = () => {
    fetch("/contacts")
      .then((response) => response.json())
      .then((response) => {
        setContacts(
          response.filter((contact) => {
            if (contact.user.id === user.id) return contacts;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const addContactModal = () => {
    document.querySelector(".addContactModal").style.display = "flex";
    document.getElementById("lightBoxBg").style.display = "flex";
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div id="lightBoxBg"></div>
      <h1>Your Contacts</h1>
      <p>{contacts.length} Contacts</p>
      <button onClick={addContactModal}>Add Contact</button>
      <AddContactForm onAddContact={onAddContact} user={user} />
      {contacts.map((contact) => {
        return <ContactCard key={contacts.id} contact={contact} />;
      })}
    </>
  );
};

export default ContactsContainer;
