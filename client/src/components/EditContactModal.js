import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, Button, Modal } from "./common";
import { UserIcon, EmailIcon, BriefcaseIcon, BuildingIcon, EditIcon, CheckIcon } from "./icons";
import { validateData, contactSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const EditContactModal = ({ contact, onEditContact, onClose }) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useToast();

  // Pre-populate form with existing contact data
  useEffect(() => {
    if (contact) {
      setContactName(contact.name || "");
      setContactEmail(contact.email || "");
      setContactTitle(contact.job_title || "");
      setContactCompany(contact.company || "");
    }
  }, [contact]);

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

    setIsLoading(true);

    // Store original data for rollback
    const originalContact = { ...contact };

    // Create optimistic update
    const optimisticContact = {
      ...contact,
      name: contactName,
      email: contactEmail,
      job_title: contactTitle,
      company: contactCompany,
    };

    // Optimistically update UI
    onEditContact(optimisticContact);
    onClose();
    toast.success('Contact updated successfully!');

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
        // Rollback to original contact
        onEditContact(originalContact);
        const friendlyMessage = handleSupabaseError(error);
        toast.error(friendlyMessage);
        logger.error('Error updating contact:', error);
      } else {
        // Replace with real data from server (if different)
        onEditContact(data[0]);
      }
    } catch (error) {
      // Rollback to original contact
      onEditContact(originalContact);
      toast.error('An unexpected error occurred. Please try again.');
      logger.error('Error:', error);
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
        <div>
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
            required
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