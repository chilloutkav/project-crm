import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { validateData, companySchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const EditCompanyModal = ({ company, onEditCompany, onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [description, setDescription] = useState("");
  const [annualRev, setAnnualRev] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useToast();

  // Pre-populate form with existing company data
  useEffect(() => {
    if (company) {
      setCompanyName(company.company_name || "");
      setOwnerName(company.owner_name || "");
      setDescription(company.description || "");
      setAnnualRev(company.annual_rev || "");
    }
  }, [company]);

  const validateForm = () => {
    const { success, errors } = validateData(companySchema, {
      company_name: companyName,
      owner_name: ownerName,
      description: description,
      annual_rev: annualRev
    });

    setValidationErrors(errors);
    return success;
  };

  // Clear error for a specific field if it becomes valid
  const clearErrorIfValid = (fieldName, value) => {
    if (validationErrors[fieldName]) {
      const testData = {
        company_name: companyName,
        owner_name: ownerName,
        description: description,
        annual_rev: annualRev,
        [fieldName]: value
      };

      const { errors } = validateData(companySchema, testData);

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

    setIsLoading(true);

    // Store original data for rollback
    const originalCompany = { ...company };

    // Create optimistic update
    const optimisticCompany = {
      ...company,
      company_name: companyName,
      owner_name: ownerName,
      description: description,
      annual_rev: annualRev,
    };

    // Optimistically update UI
    onEditCompany(optimisticCompany);
    onClose();
    toast.success('Company updated successfully!');

    try {
      const { data, error } = await supabase
        .from('companies')
        .update({
          company_name: companyName,
          owner_name: ownerName || null,
          description: description || null,
          annual_rev: annualRev || null,
        })
        .eq('id', company.id)
        .select();

      if (error) {
        // Rollback: restore original data and show error
        onEditCompany(originalCompany);
        const friendlyMessage = handleSupabaseError(error);
        toast.error(friendlyMessage);
        logger.error('Error updating company:', error);
      } else {
        // Update with real data from server
        onEditCompany(data[0]);
      }
    } catch (error) {
      onEditCompany(originalCompany);
      toast.error('An unexpected error occurred');
      logger.error('Error:', error);
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Name - Required */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name *
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            clearErrorIfValid('company_name', e.target.value);
          }}
          placeholder="Enter company name"
          className={`w-full px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            validationErrors.company_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.company_name && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.company_name}</p>
        )}
      </div>

      {/* Owner Name - Optional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Owner Name
        </label>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => {
            setOwnerName(e.target.value);
            clearErrorIfValid('owner_name', e.target.value);
          }}
          placeholder="Enter owner/CEO name (optional)"
          className={`w-full px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            validationErrors.owner_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.owner_name && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.owner_name}</p>
        )}
      </div>

      {/* Description - Optional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearErrorIfValid('description', e.target.value);
          }}
          placeholder="Enter company description (optional)"
          rows="3"
          className={`w-full px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
            validationErrors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.description && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
        )}
      </div>

      {/* Annual Revenue - Optional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Annual Revenue
        </label>
        <input
          type="text"
          value={annualRev}
          onChange={(e) => {
            setAnnualRev(e.target.value);
            clearErrorIfValid('annual_rev', e.target.value);
          }}
          placeholder="e.g., $1M-5M, Not disclosed (optional)"
          className={`w-full px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            validationErrors.annual_rev ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.annual_rev && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.annual_rev}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating...' : 'Update Company'}
        </button>
      </div>
    </form>
  );
};

export default EditCompanyModal;
