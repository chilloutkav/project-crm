import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/dashboard");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Enter password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="login-btn" type="submit" bg="#000080" color="#fff">
          {isLoading ? "Loading..." : "Login"}
        </button>
        <div>
          {errors.map((error) => (
            <error key={error}>{error}</error>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Login;
