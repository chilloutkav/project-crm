import React from "react";

const AddContactForm = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactlifecycle, setContactlifecycle] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactCompany, setContactCompany] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/dcontact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactName,
        email: contactEmail,
        lifecycle_stage: contactlifecycle,
        job_title: contactTitle,
        contact_company: contactCompany,
        user_id: 1,
        contact_id: 1,
      }),
    })
      .then((r) => r.json())
      .then((newDeal) => onAddDeal(newDeal));
  }

  return <div>AddContactForm</div>;
};

export default AddContactForm;
