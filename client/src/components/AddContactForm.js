import React, { useState } from "react";
import "../styles/addContactModal.css";

const AddContactForm = ({ user, onAddContact }) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactlifecycle, setContactLifecycle] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactCompany, setContactCompany] = useState("");

  const closeModalHandler = () => {
    document.querySelector(".addContactModal").style.display = "none";
    document.getElementById("lightBoxBg").style.display = "none";
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactName,
        email: contactEmail,
        lifecycle_stage: contactlifecycle,
        job_title: contactTitle,
        company: contactCompany,
        user_id: user.id,
      }),
    }).then((r) => {
      if (r.ok) {
        e.target.reset();
        r.json().then((newContact) => onAddContact(newContact));
      }
    });
  }

  return (
    <div className="addContactModal">
      <h1>Add a Contact!</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter your Contact Name</label>
        <input
          type="text"
          id="contactName"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
        <label>What's their email?</label>
        <input
          type="text"
          id="contactEmail"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Which lifecycle stage?</label>
        <select
          name="contactLifecycle"
          id="contactLifecycle"
          defaultValue={"default"}
          onChange={(e) => setContactLifecycle(e.target.value)}
        >
          <option value="default" disabled>
            Choose Stage
          </option>
          <option value="Subscriber">Subscriber</option>
          <option value="Marketing Qualified Lead">
            Marketing Qualified Lead
          </option>
          <option value="Sales Qualified Lead">Sales Qualified Lead</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Customer">Customer</option>
          <option value="Evangelist">Evangelist</option>
          <option value="Other">Other</option>
        </select>
        <label>Their job title?</label>
        <input
          type="text"
          id="contactTitle"
          value={contactTitle}
          onChange={(e) => setContactTitle(e.target.value)}
        />
        <label>Company they represent</label>
        <input
          type="text"
          id="contactCompany"
          value={contactCompany}
          onChange={(e) => setContactCompany(e.target.value)}
        />
        <button id="add-contact-btn" type="submit">
          Add Contact!
        </button>
      </form>
      <button onClick={closeModalHandler}>close</button>
    </div>
  );
};

export default AddContactForm;
