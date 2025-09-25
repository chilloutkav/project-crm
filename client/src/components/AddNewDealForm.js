import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddNewDealForm = ({ onAddDeal, user }) => {
  const [dealName, setDealName] = useState("");
  const [dealContact, setDealContact] = useState("");
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");

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
    }
  }

  return (
    <>
      <h1>Add a Deal!</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter your Deal Name</label>
        <input
          type="text"
          id="dealName"
          value={dealName}
          onChange={(e) => setDealName(e.target.value)}
        />
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
        <label>Enter your Deal Stage</label>
        <select
          name="dealStage"
          id="dealStage"
          defaultValue={"default"}
          onChange={(e) => setDealStage(e.target.value)}
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
        <label>Amount</label>
        <input
          type="text"
          id="dealAmount"
          value={dealAmount}
          onChange={(e) => setDealAmount(e.target.value)}
        />
        <button type="submit">Add Deal!</button>
      </form>
    </>
  );
};

export default AddNewDealForm;
