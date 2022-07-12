import React from "react";

const DealSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <label>Search Deals:</label>
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

export default DealSearch;
