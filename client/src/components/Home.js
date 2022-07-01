import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const Home = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <>
          <Login onLogin={onLogin} />
          <p>
            Don't have an Account?
            <button onclick={() => setShowLogin(false)}>Sign up!</button>
          </p>
        </>
      ) : (
        <>
          <SignUp onLogin={onLogin} />
          <p>
            Already have an account?
            <button onclick={() => setShowLogin(true)}>Sign up!</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
