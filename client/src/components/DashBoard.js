import React, { useEffect } from "react";
import CompaniesContainer from "./CompaniesContainer";
import ContactsContainer from "./ContactsContainer";
import DealsContainer from "./DealsContainer";

const DashBoard = ({ user }) => {
  console.log(user);
  return (
    <>
      <h1>Hello {user.first_name}</h1>
      <ContactsContainer user={user} />
      <CompaniesContainer user={user} />
      <DealsContainer user={user} />
    </>
  );
};

export default DashBoard;
