import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ setUser }) => {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  return (
    <div>
      <div>
        <Link to="/">
          <p>Homepage</p>
        </Link>
        <Link to="/dashboard">
          <p>Dashboard</p>
        </Link>
        <p>Contacts</p>
        <p>Companies</p>
        <p>Deals</p>
        <Link to="/login">
          <p>Login</p>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
