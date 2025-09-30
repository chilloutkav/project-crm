import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormSelect, Button } from "./common";
import { EditIcon, StageIcon, DollarIcon, CheckIcon } from "./icons";

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

  const stageOptions = [
    { value: "Lead", label: "Lead" },
    { value: "Qualified", label: "Qualified" },
    { value: "Proposal", label: "Proposal" },
    { value: "Negotiation", label: "Negotiation" },
    { value: "Closed", label: "Closed" },
    { value: "Lost", label: "Lost" }
  ];

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
        <FormSelect
          id="dealStage"
          label="Deal Stage"
          value={dealStage || deal.deal_stage}
          onChange={(e) => setDealStage(e.target.value)}
          options={stageOptions}
          icon={StageIcon}
          themeColor="green"
        />

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