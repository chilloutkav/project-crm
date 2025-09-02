import React, { useState, useEffect } from "react";

const Reports = ({ user }) => {
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data for reports
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load deals and contacts
        const [dealsResponse, contactsResponse] = await Promise.all([
          fetch("/deals").then(r => r.json()),
          fetch("/contacts").then(r => r.json())
        ]);

        // Filter user's data
        const userDeals = dealsResponse.filter(deal => deal.user.id === user.id);
        const userContacts = contactsResponse.filter(contact => contact.user.id === user.id);

        setDeals(userDeals);
        setContacts(userContacts);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user.id]);

  // Calculate metrics
  const metrics = React.useMemo(() => {
    const totalDeals = deals.length;
    const totalContacts = contacts.length;
    const totalValue = deals.reduce((sum, deal) => sum + (deal.amount || 0), 0);

    // Deal stage breakdown
    const stageBreakdown = deals.reduce((acc, deal) => {
      const stage = deal.deal_stage || "Unknown";
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    }, {});

    // Deal value by stage
    const valueByStage = deals.reduce((acc, deal) => {
      const stage = deal.deal_stage || "Unknown";
      acc[stage] = (acc[stage] || 0) + (deal.amount || 0);
      return acc;
    }, {});

    // Average deal value
    const avgDealValue = totalDeals > 0 ? totalValue / totalDeals : 0;

    // Closed won deals
    const closedWonDeals = deals.filter(deal => 
      ["closed", "closed won"].includes(deal.deal_stage?.toLowerCase())
    );
    const closedWonValue = closedWonDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0);
    const winRate = totalDeals > 0 ? (closedWonDeals.length / totalDeals) * 100 : 0;

    return {
      totalDeals,
      totalContacts,
      totalValue,
      avgDealValue,
      stageBreakdown,
      valueByStage,
      closedWonValue,
      winRate
    };
  }, [deals, contacts]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const MetricCard = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales Reports</h1>
          <p className="text-gray-600 mt-2">Analyze your sales performance and pipeline</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Pipeline Value"
            value={formatCurrency(metrics.totalValue)}
            subtitle={`${metrics.totalDeals} deals`}
            icon={
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            color="bg-green-100"
          />

          <MetricCard
            title="Closed Won Revenue"
            value={formatCurrency(metrics.closedWonValue)}
            subtitle={`${metrics.winRate.toFixed(1)}% win rate`}
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="bg-blue-100"
          />

          <MetricCard
            title="Average Deal Value"
            value={formatCurrency(metrics.avgDealValue)}
            subtitle="Per opportunity"
            icon={
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            color="bg-yellow-100"
          />

          <MetricCard
            title="Total Contacts"
            value={metrics.totalContacts}
            subtitle="Network size"
            icon={
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            color="bg-purple-100"
          />
        </div>

        {/* Pipeline Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Deal Count by Stage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline by Stage (Count)</h3>
            <div className="space-y-3">
              {Object.entries(metrics.stageBreakdown).map(([stage, count]) => (
                <div key={stage} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">{stage}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / metrics.totalDeals) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deal Value by Stage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline by Stage (Value)</h3>
            <div className="space-y-3">
              {Object.entries(metrics.valueByStage).map(([stage, value]) => (
                <div key={stage} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">{stage}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(value / metrics.totalValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                      {formatCurrency(value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{metrics.winRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {(metrics.totalContacts / Math.max(metrics.totalDeals, 1)).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Contacts per Deal</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Object.keys(metrics.stageBreakdown).length}
              </div>
              <div className="text-sm text-gray-600">Active Stages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;