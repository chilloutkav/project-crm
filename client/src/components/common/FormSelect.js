import React from 'react';

const FormSelect = ({
  id,
  label,
  value,
  onChange,
  options = [],
  required = false,
  icon: Icon,
  themeColor = "blue",
  defaultOption = "Choose an option"
}) => {
  const colorClasses = {
    blue: "focus:ring-blue-500 focus:border-blue-500",
    green: "focus:ring-green-500 focus:border-green-500",
    purple: "focus:ring-purple-500 focus:border-purple-500"
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-3 border border-gray-300 rounded-lg ${colorClasses[themeColor]} transition-colors duration-200 bg-white appearance-none`}
          required={required}
        >
          <option value="" disabled>
            {defaultOption}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FormSelect;