import React from "react";
import { Link } from "react-router-dom";
import { EmailIcon } from "./icons";

const ContactCard = ({ contact }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 p-6 group">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-50 group-hover:ring-blue-50 transition-all duration-300">
          <img
            src={contact.image_url}
            alt={contact.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg hidden">
            {contact.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center space-y-2 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {contact.name}
          </h3>
          {contact.job_title && (
            <p className="text-sm text-gray-600 font-medium">
              {contact.job_title}
            </p>
          )}
          {(contact.companies?.company_name || contact.company) && (
            <p className="text-sm text-orange-600 font-medium">
              {contact.companies?.company_name || contact.company}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="w-full pt-4 border-t border-gray-100">
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
          >
            <EmailIcon className="w-4 h-4" />
            <span className="truncate">{contact.email}</span>
          </a>
        </div>

        {/* Action Button */}
        <Link
          to={`/dashboard/contacts/${contact.id}`}
          className="w-full"
        >
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View Details</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;