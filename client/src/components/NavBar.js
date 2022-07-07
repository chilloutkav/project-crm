import React from "react";

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
        <p>Dashboard</p>
        <p>Contacts</p>
        <p>Companies</p>
        <p>Deals</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
