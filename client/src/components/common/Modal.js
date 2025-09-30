import React from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  icon: Icon,
  iconBgColor = "bg-blue-600",
  maxWidth = "max-w-md"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-2xl shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-8 space-y-6">
          {/* Header */}
          {(Icon || title) && (
            <div className="text-center">
              {Icon && (
                <div className={`mx-auto w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              )}
              {title && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                  {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
                </>
              )}
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;