import React from "react";

const ContactsContainer = ({ user }) => {
  return (
    <>
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
          {user.contacts.map((contact) => (
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
