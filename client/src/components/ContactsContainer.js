import React, { useEffect, useState } from "react";

const ContactsContainer = ({ user }) => {
  const [contacts, setContacts] = useState([]);

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

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <h1>Your Contacts</h1>
      <p>{contacts.length} Contacts</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Lifecycle Stage</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.job_title}</td>
              <td>{contact.lifecycle_stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactsContainer;
