import React from "react";
import { SearchInput } from "./common";

const DealSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <SearchInput
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      placeholder="Search deals..."
    />
  );
};

export default DealSearch;