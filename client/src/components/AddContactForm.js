import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, Button, Modal } from "./common";
import { UserIcon, EmailIcon, BriefcaseIcon, BuildingIcon, PlusIcon } from "./icons";

const AddContactForm = ({ user, onAddContact, onClose }) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactCompany, setContactCompany] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: contactName,
          email: contactEmail,
          job_title: contactTitle,
          company: contactCompany,
          user_id: user.id,
        }
      ])
      .select();

    if (error) {
      console.error('Error adding contact:', error);
    } else {
      e.target.reset();
      onAddContact(data[0]);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Add New Contact"
      subtitle="Enter contact information below"
      icon={UserIcon}
      iconBgColor="bg-blue-600"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="contactName"
          label="Contact Name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Enter contact name"
          icon={UserIcon}
          themeColor="blue"
          required
        />

        <FormInput
          id="contactEmail"
          label="Email Address"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Enter email address"
          icon={EmailIcon}
          themeColor="blue"
        />

        <FormInput
          id="contactTitle"
          label="Job Title"
          value={contactTitle}
          onChange={(e) => setContactTitle(e.target.value)}
          placeholder="Enter job title"
          icon={BriefcaseIcon}
          themeColor="blue"
        />

        <FormInput
          id="contactCompany"
          label="Company"
          value={contactCompany}
          onChange={(e) => setContactCompany(e.target.value)}
          placeholder="Enter company name"
          icon={BuildingIcon}
          themeColor="blue"
        />

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={PlusIcon}
            className="flex-1"
          >
            Add Contact
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddContactForm;