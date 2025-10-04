import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormSelect, Button } from "./common";
import { EditIcon, StageIcon, DollarIcon, CheckIcon } from "./icons";
import { DEAL_STAGES } from "../utils/dealHelpers";
import { validateData, dealSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const EditDealForm = ({ id, getDeal, deal }) => {
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useToast();

  const validateForm = () => {
    // Validate with current or fallback values
    const { success, errors } = validateData(dealSchema, {
      deal_name: deal.deal_name, // Keep existing name (not editable in this form)
      deal_stage: dealStage || deal.deal_stage,
      amount: dealAmount ? parseFloat(dealAmount) : deal.amount
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

    try {
      const { error } = await supabase
        .from('deals')
        .update({
          deal_stage: dealStage || deal.deal_stage,
          amount: dealAmount ? parseInt(dealAmount) : deal.amount,
        })
        .eq('id', id);

      if (error) {
        const friendlyMessage = handleSupabaseError(error);
        toast.error(friendlyMessage);
        logger.error('Error updating deal:', error);
      } else {
        toast.success('Deal updated successfully!');
        getDeal();
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      logger.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
          <EditIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Edit Deal</h2>
        <p className="mt-2 text-gray-600">Update deal information below</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <FormSelect
            id="dealStage"
            label="Deal Stage"
            value={dealStage || deal.deal_stage}
            onChange={(e) => setDealStage(e.target.value)}
            options={DEAL_STAGES}
            icon={StageIcon}
            themeColor="green"
          />
          {validationErrors.deal_stage && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.deal_stage}</p>
          )}
        </div>

        <div>
          <FormInput
            id="dealAmount"
            label="Amount ($)"
            type="number"
            value={dealAmount}
            onChange={(e) => setDealAmount(e.target.value)}
            placeholder={`Current: $${deal.amount?.toLocaleString() || '0'}`}
            icon={DollarIcon}
            themeColor="green"
          />
          {validationErrors.amount && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.amount}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="success"
          loading={isLoading}
          icon={CheckIcon}
          className="w-full"
        >
          {isLoading ? 'Updating Deal...' : 'Update Deal'}
        </Button>
      </form>
    </div>
  );
};

export default EditDealForm;