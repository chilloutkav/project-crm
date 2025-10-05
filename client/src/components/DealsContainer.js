import React, { useState, useEffect, useMemo } from "react";
import DealsList from "./DealsList";
import DealSearch from "./DealSearch";
import AddDealModal from "./AddDealModal";
import SkeletonLoader from "./common/SkeletonLoader";
import { supabase } from "../supabaseClient";
import { formatCurrency } from "../utils/formatters";
import logger from "../utils/logger";

const DealsContainer = ({ user }) => {
  const [deals, setDeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [showDealModal, setShowDealModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const onAddDeal = (newDeal) => {
    // Handle optimistic UI rollback (error case)
    if (newDeal._shouldRemove) {
      setDeals(deals.filter(d => d.id !== newDeal.id));
      return;
    }

    // Handle replacing optimistic deal with real data (success case)
    if (newDeal._replaceId) {
      setDeals(deals.map(d =>
        d.id === newDeal._replaceId ? { ...newDeal, _replaceId: undefined } : d
      ));
      return;
    }

    // Normal add (optimistic) - Add new deal at the beginning (newest first)
    const displayedDeals = [newDeal, ...deals];
    setDeals(displayedDeals);
    setShowDealModal(false);
  };

  const getDeals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          contacts (
            name,
            email,
            company
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching deals:', error);
      } else {
        setDeals(data || []);
      }
    } catch (error) {
      logger.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  const stats = useMemo(() => {
    const newStageDeals = deals.filter(deal => 
      ['appointment scheduled', 'qualified to buy', 'lead', 'qualified'].includes(deal.deal_stage?.toLowerCase())
    );
    const progressStageDeals = deals.filter(deal => 
      ['presentation scheduled', 'decision maker brought-in', 'contract sent', 'proposal', 'negotiation'].includes(deal.deal_stage?.toLowerCase())
    );
    const closedDeals = deals.filter(deal => 
      ['closed won', 'closed'].includes(deal.deal_stage?.toLowerCase())
    );
    
    return {
      newDealsAmount: newStageDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0),
      progressDealsAmount: progressStageDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0),
      closedDealsAmount: closedDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0),
      newDealsCount: newStageDeals.length,
      progressDealsCount: progressStageDeals.length,
      closedDealsCount: closedDeals.length
    };
  }, [deals]);

  const addDealModal = () => {
    setShowDealModal(true);
  };

  const displayedDeals = deals.filter((deal) => {
    const matchesSearch = deal.deal_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === "all" || deal.deal_stage?.toLowerCase() === selectedStage.toLowerCase();
    return matchesSearch && matchesStage;
  });

  // Dynamically get all unique deal stages from the data
  const dealStages = useMemo(() => {
    const stages = new Set(deals.map(deal => deal.deal_stage?.trim()).filter(Boolean));
    return ["all", ...Array.from(stages).sort()];
  }, [deals]);

  // Reset selected stage to "all" if it no longer exists in the data
  useEffect(() => {
    if (selectedStage !== "all" && !dealStages.includes(selectedStage)) {
      setSelectedStage("all");
    }
  }, [dealStages, selectedStage]);

  useEffect(() => {
    getDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StatCard = ({ title, value, count, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(value)}</p>
          <p className="text-sm text-gray-500">{count} deals</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deals Overview</h1>
          <p className="text-gray-600 mt-2">Track and manage your sales opportunities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <SkeletonLoader type="stat" count={3} />
          ) : (
            <>
              <StatCard
                title="New Deals"
                value={stats.newDealsAmount}
                count={stats.newDealsCount}
                icon={
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                color="bg-blue-100"
              />

              <StatCard
                title="In Progress"
                value={stats.progressDealsAmount}
                count={stats.progressDealsCount}
                icon={
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="bg-yellow-100"
              />

              <StatCard
                title="Closed Won"
                value={stats.closedDealsAmount}
                count={stats.closedDealsCount}
                icon ={
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="bg-green-100"
              />
            </>
          )}
        </div>

        {/* Actions and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">All Deals</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {displayedDeals.length} of {deals.length} deals
                  {selectedStage !== "all" && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {selectedStage}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <DealSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                
                {/* Stage Filter Dropdown */}
                <div className="relative">
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 capitalize"
                  >
                    {dealStages.map((stage) => (
                      <option key={stage} value={stage} className="capitalize">
                        {stage === "all" ? "All Stages" : stage}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <button 
                  onClick={addDealModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add New Deal</span>
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <SkeletonLoader type="card" count={4} />
            </div>
          ) : (
            <DealsList deals={displayedDeals} getDeals={getDeals} />
          )}
        </div>

        {showDealModal && (
          <AddDealModal
            user={user}
            onAddDeal={onAddDeal}
            onClose={() => setShowDealModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DealsContainer;
