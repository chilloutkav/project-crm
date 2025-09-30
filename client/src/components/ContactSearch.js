import React from "react";
import { SearchInput } from "./common";

const ContactSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <SearchInput
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      placeholder="Search contacts..."
    />
  );
};

export default ContactSearch;