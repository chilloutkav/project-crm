import React from 'react';

const FormTextArea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  icon: Icon,
  themeColor = "blue"
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
          <div className="absolute top-3 left-3 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg ${colorClasses[themeColor]} transition-colors duration-200 resize-none placeholder-gray-400`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormTextArea;