import React from "react";

const CompaniesContainer = ({ user }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Owner Name</th>
            <th>Description</th>
            <th>Annual Revnue</th>
          </tr>
        </thead>
        <tbody>
          {user.companies.map((company) => (
            <tr key={company.id}>
              <td>{company.company_name}</td>
              <td>{company.owner_name}</td>
              <td>{company.description}</td>
              <td>{company.annual_rev}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CompaniesContainer;
