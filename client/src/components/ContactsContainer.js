import React, { useEffect, useState } from "react";
import AddContactForm from "./AddContactForm";
import { Link } from "react-router-dom";
import "../styles/dealsContainer.css";

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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Lifecycle Stage</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.job_title}</td>
              <td>{contact.lifecycle_stage}</td>
              <Link to={`/dashboard/contacts/${contact.id}`}>
                <button>Contact Notes</button>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactsContainer;
