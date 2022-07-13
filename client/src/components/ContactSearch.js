import React from "react";
import "../styles/contactSearch.css";

const ContactSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="contact__contact-search">
      <label>Search Contacts:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ContactSearch;
