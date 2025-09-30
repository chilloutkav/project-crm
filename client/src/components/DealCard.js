import React from "react";
import { Link } from "react-router-dom";
import { DollarIcon, BuildingIcon, UserIcon } from "./icons";
import { formatCurrency } from "../utils/formatters";
import { getStageColor, getStageIcon } from "../utils/dealHelpers";

const DealCard = ({ deal, getDeals }) => {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 p-6 group">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {deal.deal_name}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(deal.deal_stage)}`}>
            {getStageIcon(deal.deal_stage)}
            <span className="ml-1">{deal.deal_stage}</span>
          </span>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <DollarIcon className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(deal.amount)}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BuildingIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{deal.contacts?.company || 'No Company'}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <UserIcon className="w-4 h-4 text-gray-400" />
            <span>{deal.contacts?.name || 'No Contact'}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link to={`/dashboard/deals/${deal.id}`} className="w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View Details</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealCard;