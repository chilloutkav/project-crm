import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const EditDealForm = ({ id, getDeal, deal }) => {
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
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
        console.error('Error updating deal:', error);
      } else {
        getDeal();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Edit Deal</h2>
        <p className="mt-2 text-gray-600">Update deal information below</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Deal Stage */}
        <div>
          <label htmlFor="dealStage" className="block text-sm font-medium text-gray-700 mb-2">
            Deal Stage
          </label>
          <select
            name="dealStage"
            id="dealStage"
            defaultValue="default"
            onChange={(e) => setDealStage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          >
            <option value="default">{deal.deal_stage}</option>
            <option value="Lead">Lead</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed">Closed</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="dealAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount ($)
          </label>
          <input
            type="number"
            id="dealAmount"
            value={dealAmount}
            onChange={(e) => setDealAmount(e.target.value)}
            placeholder={`Current: $${deal.amount?.toLocaleString() || '0'}`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Updating Deal...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Update Deal</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditDealForm;
