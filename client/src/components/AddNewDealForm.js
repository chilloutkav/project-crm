import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { validateData, dealSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const AddNewDealForm = ({ onAddDeal, user }) => {
  const [dealName, setDealName] = useState("");
  const [dealContact, setDealContact] = useState("");
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

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

    // Check that a contact is selected
    if (!dealContact) {
      toast.error('Please select a contact for this deal');
      return;
    }

    setIsSubmitting(true);

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
      const friendlyMessage = handleSupabaseError(error);
      toast.error(friendlyMessage);
      logger.error('Error adding deal:', error);
    } else {
      toast.success('Deal added successfully!');
      e.target.reset();
      onAddDeal(data[0]);
    }
  }

  return (
    <>
      <h1>Add a Deal!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your Deal Name</label>
          <input
            type="text"
            id="dealName"
            value={dealName}
            onChange={(e) => {
              setDealName(e.target.value);
              clearErrorIfValid('deal_name', e.target.value);
            }}
          />
          {validationErrors.deal_name && (
            <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {validationErrors.deal_name}
            </p>
          )}
        </div>

        <label>Which Contact?</label>
        <select
          name="dealContact"
          id="dealContact"
          defaultValue={"default"}
          onChange={(e) => setDealContact(e.target.value)}
        >
          <option value="default" disabled>
            Choose Contact
          </option>
          {user.contacts.map((contact) => {
            return (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            );
          })}
        </select>

        <div>
          <label>Enter your Deal Stage</label>
          <select
            name="dealStage"
            id="dealStage"
            defaultValue={"default"}
            onChange={(e) => {
              setDealStage(e.target.value);
              clearErrorIfValid('deal_stage', e.target.value);
            }}
          >
            <option value="default" disabled>
              Choose Here
            </option>
            <option value="Appointment Scheduled">Appointment Scheduled</option>
            <option value="Qualified to Buy">Qualified to Buy</option>
            <option value="Presentation Scheduled">Presentation Scheduled</option>
            <option value="Decision Maker Bought-In">
              Decision Maker Bought-In
            </option>
            <option value="Contract Sent">Contract Sent</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
          {validationErrors.deal_stage && (
            <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {validationErrors.deal_stage}
            </p>
          )}
        </div>

        <div>
          <label>Amount</label>
          <input
            type="text"
            id="dealAmount"
            value={dealAmount}
            onChange={(e) => {
              setDealAmount(e.target.value);
              clearErrorIfValid('amount', e.target.value);
            }}
          />
          {validationErrors.amount && (
            <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {validationErrors.amount}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Deal!'}
        </button>
      </form>
    </>
  );
};

export default AddNewDealForm;
