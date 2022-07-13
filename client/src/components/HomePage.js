import React from "react";
import SignUpLoginPage from "./SignUpLoginPage";

const HomePage = ({ onLogin }) => {
  return (
    <>
      <SignUpLoginPage onLogin={onLogin} />
    </>
  );
};

export default HomePage;
