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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NavBar;
