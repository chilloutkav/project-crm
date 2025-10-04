import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, Button, Modal } from "./common";
import { UserIcon, EmailIcon, BriefcaseIcon, BuildingIcon, PlusIcon } from "./icons";
import { validateData, contactSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const AddContactForm = ({ user, onAddContact, onClose }) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    const { success, errors } = validateData(contactSchema, {
      name: contactName,
      email: contactEmail,
      job_title: contactTitle,
      company: contactCompany
    });

    setValidationErrors(errors);
    return success;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);

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

    setIsSubmitting(false);

    if (error) {
      const friendlyMessage = handleSupabaseError(error);
      toast.error(friendlyMessage);
      logger.error('Error adding contact:', error);
    } else {
      toast.success('Contact added successfully!');
      e.target.reset();
      onAddContact(data[0]);
      onClose();
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
        <div>
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
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
          )}
        </div>

        <div>
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
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <FormInput
            id="contactTitle"
            label="Job Title"
            value={contactTitle}
            onChange={(e) => setContactTitle(e.target.value)}
            placeholder="Enter job title"
            icon={BriefcaseIcon}
            themeColor="blue"
          />
          {validationErrors.job_title && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.job_title}</p>
          )}
        </div>

        <div>
          <FormInput
            id="contactCompany"
            label="Company"
            value={contactCompany}
            onChange={(e) => setContactCompany(e.target.value)}
            placeholder="Enter company name"
            icon={BuildingIcon}
            themeColor="blue"
          />
          {validationErrors.company && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.company}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={PlusIcon}
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Contact'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddContactForm;