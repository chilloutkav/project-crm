import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, Button, Modal } from "./common";
import { UserIcon, EmailIcon, BriefcaseIcon, BuildingIcon, EditIcon, CheckIcon } from "./icons";

const EditContactModal = ({ contact, onEditContact, onClose }) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Pre-populate form with existing contact data
  useEffect(() => {
    if (contact) {
      setContactName(contact.name || "");
      setContactEmail(contact.email || "");
      setContactTitle(contact.job_title || "");
      setContactCompany(contact.company || "");
    }
  }, [contact]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({
          name: contactName,
          email: contactEmail,
          job_title: contactTitle,
          company: contactCompany,
        })
        .eq('id', contact.id)
        .select();

      if (error) {
        console.error('Error updating contact:', error);
        setErrors([error.message]);
      } else {
        onEditContact(data[0]);
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit Contact"
      subtitle="Update contact information below"
      icon={EditIcon}
      iconBgColor="bg-blue-600"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="contactName"
          label="Full Name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Enter contact's full name"
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
          required
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

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                {errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-800">{error}</p>
                ))}
              </div>
            </div>
          </div>
        )}

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
            icon={CheckIcon}
            loading={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Updating...' : 'Update Contact'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditContactModal;