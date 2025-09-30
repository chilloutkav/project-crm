import React from 'react';

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon: Icon,
  className = ""
}) => {
  const baseClasses = "font-medium transition-all duration-200 flex items-center justify-center space-x-2 rounded-lg";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white shadow-lg hover:shadow-xl",
    danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-lg hover:shadow-xl",
    purple: "bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white shadow-lg hover:shadow-xl"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-6 py-4 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? 'cursor-not-allowed' : ''} ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{typeof children === 'string' && children.includes('...') ? children : 'Loading...'}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;