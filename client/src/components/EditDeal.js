import React, { useState } from "react";

const EditDeal = () => {
  const [dealStage, setDealStage] = useState("");
  const [dealAmount, setDealAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/deals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deal_stage: dealStage,
        amount: parseInt(dealAmount),
      }),
    })
      .then((r) => r.json())
      .then((newDeal) => onAddDeal(newDeal));
  }

  return (
    <>
      <h1>Edit Deal!</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Edit Deal!</button>
      </form>
    </>
  );
};

export default EditDeal;
