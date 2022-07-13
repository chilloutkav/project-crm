import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "../styles/signUpLoginPage.css";

const SignUpLoginPage = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="signUpLoginPage-wrapper">
      {showLogin ? (
        <div>
          <h1>Welcome Back!</h1>
          <Login onLogin={onLogin} />
          <p>
            Don't have an Account?
            <button id="sign-log-btn" onClick={() => setShowLogin(false)}>
              Sign up!
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h1>Sign Up Below!</h1>
          <SignUp onLogin={onLogin} />
          <p>
            Already have an account?
            <button id="sign-log-btn" onClick={() => setShowLogin(true)}>
              Login!
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpLoginPage;
