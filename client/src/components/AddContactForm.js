import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, Button, Modal } from "./common";
import { UserIcon, EmailIcon, BriefcaseIcon, PlusIcon } from "./icons";
import CompanyDropdown from "./CompanyDropdown";
import { validateData, contactSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const AddContactForm = ({ user, onAddContact, onClose }) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await supabase
          .from('companies')
          .select('id, company_name')
          .eq('user_id', user.id)
          .order('company_name');

        if (data) setCompanies(data);
      } catch (error) {
        logger.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, [user.id]);

  const validateForm = () => {
    const { success, errors } = validateData(contactSchema, {
      name: contactName,
      email: contactEmail,
      job_title: contactTitle,
      company: ""
    });

    setValidationErrors(errors);
    return success;
  };

  // Clear error for a specific field if it becomes valid
  const clearErrorIfValid = (fieldName, value) => {
    if (validationErrors[fieldName]) {
      const testData = {
        name: contactName,
        email: contactEmail,
        job_title: contactTitle,
        company: "",
        [fieldName]: value
      };

      const { errors } = validateData(contactSchema, testData);

      if (!errors[fieldName]) {
        setValidationErrors(prev => ({ ...prev, [fieldName]: undefined }));
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);

    // Create optimistic contact with temporary ID
    const tempId = `temp-${Date.now()}`;
    const optimisticContact = {
      id: tempId,
      name: contactName,
      email: contactEmail,
      job_title: contactTitle,
      company_id: companyId,
      companies: companyId ? companies.find(c => c.id === companyId) : null,
      user_id: user.id,
      created_at: new Date().toISOString()
    };

    // Optimistically update UI
    onAddContact(optimisticContact);
    onClose();
    toast.success('Contact added successfully!');

    // Make API call
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: contactName,
          email: contactEmail,
          job_title: contactTitle,
          company_id: companyId || null,
          user_id: user.id,
        }
      ])
      .select('*, companies(company_name, id)');

    setIsSubmitting(false);

    if (error) {
      // Rollback: remove optimistic contact and show error
      onAddContact({ ...optimisticContact, _shouldRemove: true });
      const friendlyMessage = handleSupabaseError(error);
      toast.error(friendlyMessage);
      logger.error('Error adding contact:', error);
    } else {
      // Replace optimistic contact with real data
      onAddContact({ ...data[0], _replaceId: tempId });
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
            onChange={(e) => {
              setContactName(e.target.value);
              clearErrorIfValid('name', e.target.value);
            }}
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
            onChange={(e) => {
              setContactEmail(e.target.value);
              clearErrorIfValid('email', e.target.value);
            }}
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
            onChange={(e) => {
              setContactTitle(e.target.value);
              clearErrorIfValid('job_title', e.target.value);
            }}
            placeholder="Enter job title"
            icon={BriefcaseIcon}
            themeColor="blue"
          />
          {validationErrors.job_title && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.job_title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company (Optional)
          </label>
          <CompanyDropdown
            companies={companies}
            value={companyId}
            onChange={(selectedId) => setCompanyId(selectedId)}
            isClearable={true}
          />
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