import React, { useEffect, useState } from "react";
import AddContactForm from "./AddContactForm";
import ContactSearch from "./ContactSearch";
import "../styles/contactsContainer.css";
import ContactsList from "./ContactsList";

const ContactsContainer = ({ user }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const displayedContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div id="lightBoxBg"></div>
      <h1>Your Contacts</h1>
      <p className="contact__contact-count">{contacts.length} Contacts</p>
      <ContactSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <button id="add-contact" onClick={addContactModal}>
        Add Contact
      </button>
      <AddContactForm onAddContact={onAddContact} user={user} />
      <ContactsList contacts={displayedContacts} />
    </>
  );
};

export default ContactsContainer;
