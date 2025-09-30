import React from 'react';
import { SearchIcon, CloseIcon } from '../icons';

/**
 * Reusable search input component with clear button
 * @param {string} searchTerm - Current search value
 * @param {function} onSearchChange - Callback when search value changes
 * @param {string} placeholder - Placeholder text for the input
 */
const SearchInput = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="relative max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;