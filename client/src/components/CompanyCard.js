import React from "react";
import { Link } from "react-router-dom";
import { Building2, Edit2, Trash2 } from "lucide-react";

const CompanyCard = ({ company, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 p-6 group">
      <div className="flex flex-col items-center space-y-4">
        {/* Company Icon */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-100 ring-4 ring-orange-50 group-hover:ring-orange-100 transition-all duration-300 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-orange-600" />
        </div>

        {/* Company Info */}
        <div className="text-center space-y-2 flex-1 w-full">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
            {company.company_name}
          </h3>

          {company.owner_name && (
            <p className="text-sm text-gray-600 font-medium">
              Owner: {company.owner_name}
            </p>
          )}

          {company.annual_rev && (
            <p className="text-sm text-orange-600 font-medium">
              Revenue: {company.annual_rev}
            </p>
          )}

          {company.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {company.description}
            </p>
          )}
        </div>

        {/* Details Link */}
        <Link
          to={`/dashboard/companies/${company.id}`}
          className="w-full"
        >
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View Details</span>
          </button>
        </Link>

        {/* Action Buttons */}
        <div className="w-full flex gap-2">
          <button
            onClick={() => onEdit(company)}
            className="flex-1 bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
            aria-label={`Edit ${company.company_name}`}
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(company)}
            className="flex-1 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
            aria-label={`Delete ${company.company_name}`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
