import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "../styles/signUpLoginPage.css";

const SignUpLoginPage = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="signUpLoginPage-wrapper">
      {showLogin ? (
        <div className="signUpLoginPage-wrapper_content">
          <h1>Welcome Back!</h1>
          <Login onLogin={onLogin} />
          <p>Don't have an Account?</p>
          <button id="sign-log-btn" onClick={() => setShowLogin(false)}>
            Sign up!
          </button>
        </div>
      ) : (
        <div className="signUpLoginPage-wrapper_content">
          <h1>Sign Up Below!</h1>
          <SignUp onLogin={onLogin} />
          <p>Already have an account?</p>
          <button id="sign-log-btn" onClick={() => setShowLogin(true)}>
            Login!
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpLoginPage;
