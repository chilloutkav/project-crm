import React from 'react';

/**
 * Reusable empty state component for displaying "no data" messages
 * @param {JSX.Element} icon - Icon component to display
 * @param {string} title - Main heading text
 * @param {string} description - Descriptive text below the title
 */
const EmptyState = ({ icon, title, description }) => {
  return (
    <div className="p-12 text-center">
      <div className="w-16 h-16 mx-auto text-gray-300 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;