import React from "react";

const DealsContainer = ({ user }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Deal Stage</th>
            <th>Amount</th>
            <th>Lifecycle Stage</th>
          </tr>
        </thead>
        <tbody>
          {user.deals.map((deal) => (
            <tr key={deal.id}>
              <td>{deal.deal_name}</td>
              <td>{deal.deal_stage}</td>
              <td>{deal.amount}</td>
              <td>{deal.lifecycle_stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DealsContainer;
