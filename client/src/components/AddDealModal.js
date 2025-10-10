import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormSelect, Button, Modal } from "./common";
import { ChartIcon, UserIcon, StageIcon, DollarIcon, PlusIcon } from "./icons";
import { DEAL_STAGES } from "../utils/dealHelpers";
import { validateData, dealSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const AddDealModal = ({ user, onAddDeal, onClose }) => {
  const [dealName, setDealName] = useState("");
  const [dealContact, setDealContact] = useState("");
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [contacts, setContacts] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const getContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        logger.error('Error fetching contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      logger.error('Error:', error);
    }
  };

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const validateForm = () => {
    const { success, errors } = validateData(dealSchema, {
      deal_name: dealName,
      deal_stage: dealStage,
      amount: parseFloat(dealAmount) || 0
    });

    setValidationErrors(errors);
    return success;
  };

  // Clear error for a specific field if it becomes valid
  const clearErrorIfValid = (fieldName, value) => {
    if (validationErrors[fieldName]) {
      const testData = {
        deal_name: dealName,
        deal_stage: dealStage,
        amount: parseFloat(dealAmount) || 0,
        [fieldName]: fieldName === 'amount' ? parseFloat(value) || 0 : value
      };

      const { errors } = validateData(dealSchema, testData);

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

    // Check that a contact is selected (not validated by schema)
    if (!dealContact) {
      toast.error('Please select a contact for this deal');
      return;
    }

    setIsSubmitting(true);

    // Create optimistic deal with temporary ID
    const tempId = `temp-${Date.now()}`;
    const selectedContact = contacts.find(c => c.id === dealContact);
    const optimisticDeal = {
      id: tempId,
      deal_name: dealName,
      deal_stage: dealStage,
      amount: parseInt(dealAmount),
      user_id: user.id,
      contact_id: dealContact,
      created_at: new Date().toISOString(),
      contacts: selectedContact ? {
        name: selectedContact.name,
        email: selectedContact.email,
        company: selectedContact.company
      } : null
    };

    // Optimistically update UI
    onAddDeal(optimisticDeal);
    onClose();
    toast.success('Deal added successfully!');

    // Make API call
    const { data, error } = await supabase
      .from('deals')
      .insert([
        {
          deal_name: dealName,
          deal_stage: dealStage,
          amount: parseInt(dealAmount),
          user_id: user.id,
          contact_id: dealContact,
        }
      ])
      .select();

    setIsSubmitting(false);

    if (error) {
      // Rollback: remove optimistic deal and show error
      onAddDeal({ ...optimisticDeal, _shouldRemove: true });
      const friendlyMessage = handleSupabaseError(error);
      toast.error(friendlyMessage);
      logger.error('Error adding deal:', error);
    } else {
      // Replace optimistic deal with real data
      onAddDeal({ ...data[0], _replaceId: tempId });
    }
  }

  const contactOptions = contacts.map(contact => ({
    value: contact.id,
    label: contact.name
  }));

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Add New Deal"
      subtitle="Enter deal information below"
      icon={ChartIcon}
      iconBgColor="bg-green-600"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormInput
            id="dealName"
            label="Deal Name"
            value={dealName}
            onChange={(e) => {
              setDealName(e.target.value);
              clearErrorIfValid('deal_name', e.target.value);
            }}
            placeholder="Enter deal name"
            icon={ChartIcon}
            themeColor="green"
            required
          />
          {validationErrors.deal_name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.deal_name}</p>
          )}
        </div>

        <FormSelect
          id="dealContact"
          label="Contact"
          value={dealContact}
          onChange={(e) => setDealContact(e.target.value)}
          options={contactOptions}
          icon={UserIcon}
          themeColor="green"
          defaultOption="Choose Contact"
          required
        />

        <div>
          <FormSelect
            id="dealStage"
            label="Deal Stage"
            value={dealStage}
            onChange={(e) => {
              setDealStage(e.target.value);
              clearErrorIfValid('deal_stage', e.target.value);
            }}
            options={DEAL_STAGES}
            icon={StageIcon}
            themeColor="green"
            defaultOption="Choose Stage"
            required
          />
          {validationErrors.deal_stage && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.deal_stage}</p>
          )}
        </div>

        <div>
          <FormInput
            id="dealAmount"
            label="Deal Amount"
            type="number"
            value={dealAmount}
            onChange={(e) => {
              setDealAmount(e.target.value);
              clearErrorIfValid('amount', e.target.value);
            }}
            placeholder="Enter deal amount"
            icon={DollarIcon}
            themeColor="green"
            required
          />
          {validationErrors.amount && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.amount}</p>
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
            variant="success"
            icon={PlusIcon}
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Deal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDealModal;