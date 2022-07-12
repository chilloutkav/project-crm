import React from "react";

const ContactSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
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
