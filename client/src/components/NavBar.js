import React from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css";

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
    <div id="navBar">
      <div>
        <Link to="/">
          <p>Homepage</p>
        </Link>
        <Link to="/dashboard">
          <p>Dashboard</p>
        </Link>
        <Link to="/dashboard/contacts">
          <p>Contacts</p>
        </Link>
        <Link to="/login">
          <p>Login</p>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
