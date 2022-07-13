import React from "react";
import "../styles/dealSearch.css";

const DealSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div id="deal-search">
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
