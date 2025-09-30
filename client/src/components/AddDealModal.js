import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormSelect, Button, Modal } from "./common";
import { ChartIcon, UserIcon, StageIcon, DollarIcon, PlusIcon } from "./icons";

const AddDealModal = ({ user, onAddDeal, onClose }) => {
  const [dealName, setDealName] = useState("");
  const [dealContact, setDealContact] = useState("");
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  async function handleSubmit(e) {
    e.preventDefault();

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

    if (error) {
      console.error('Error adding deal:', error);
    } else {
      e.target.reset();
      onAddDeal(data[0]);
      onClose();
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
        <FormInput
          id="dealName"
          label="Deal Name"
          value={dealName}
          onChange={(e) => setDealName(e.target.value)}
          placeholder="Enter deal name"
          icon={ChartIcon}
          themeColor="green"
          required
        />

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

        <FormSelect
          id="dealStage"
          label="Deal Stage"
          value={dealStage}
          onChange={(e) => setDealStage(e.target.value)}
          options={stageOptions}
          icon={StageIcon}
          themeColor="green"
          defaultOption="Choose Stage"
          required
        />

        <FormInput
          id="dealAmount"
          label="Deal Amount"
          type="number"
          value={dealAmount}
          onChange={(e) => setDealAmount(e.target.value)}
          placeholder="Enter deal amount"
          icon={DollarIcon}
          themeColor="green"
          required
        />

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
            variant="success"
            icon={PlusIcon}
            className="flex-1"
          >
            Add Deal
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDealModal;