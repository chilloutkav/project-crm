import React, { useState } from "react";

const AddNewDealForm = ({ onAddDeal }) => {
  const [dealName, setDealName] = useState("");
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/deals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deal_name: dealName,
        deal_stage: dealStage,
        amount: parseInt(dealAmount),
        user_id: 1,
        contact_id: 1,
      }),
    })
      .then((r) => r.json())
      .then((newDeal) => onAddDeal(newDeal));
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
        <label>Enter your Deal Stage</label>
        <select
          name="dealStage"
          id="dealStage"
          defaultValue={"default"}
          onChange={(e) => setDealStage(e.target.value)}
        >
          <option value="default">Choose Here</option>
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
