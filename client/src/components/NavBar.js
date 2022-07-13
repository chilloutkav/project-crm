import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navBar.css";

const NavBar = ({ setUser }) => {
  let navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }
  return (
    <div id="navBar">
      <div>
        <Link to="/dashboard">
          <p>Dashboard</p>
        </Link>
        <Link to="/dashboard/contacts">
          <p>Contacts</p>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
