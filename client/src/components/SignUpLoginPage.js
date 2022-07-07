import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const SignUpLoginPage = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <div>
          <Login onLogin={onLogin} />
          <p>
            Don't have an Account?
            <button onClick={() => setShowLogin(false)}>Sign up!</button>
          </p>
        </div>
      ) : (
        <div>
          <SignUp onLogin={onLogin} />
          <p>
            Already have an account?
            <button onClick={() => setShowLogin(true)}>Login!</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpLoginPage;
