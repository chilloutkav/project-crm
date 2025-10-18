import React, { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import AddCompanyForm from "./AddCompanyForm";
import CompanySearch from "./CompanySearch";
import CompanyCard from "./CompanyCard";
import EditCompanyModal from "./EditCompanyModal";
import SkeletonLoader from "./common/SkeletonLoader";
import { supabase } from "../supabaseClient";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const CompaniesContainer = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const toast = useToast();

  const onAddCompany = (newCompany) => {
    // Handle optimistic UI rollback (error case)
    if (newCompany._shouldRemove) {
      setCompanies(prevCompanies => prevCompanies.filter(c => c.id !== newCompany.id));
      return;
    }

    // Handle replacing optimistic company with real data (success case)
    if (newCompany._replaceId) {
      setCompanies(prevCompanies => prevCompanies.map(c =>
        c.id === newCompany._replaceId ? { ...newCompany, _replaceId: undefined } : c
      ));
      return;
    }

    // Normal add (optimistic) - use functional update to avoid stale state
    setCompanies(prevCompanies => [...prevCompanies, newCompany]);
  };

  const onEditCompany = (updatedCompany) => {
    setCompanies(prevCompanies => prevCompanies.map(c =>
      c.id === updatedCompany.id ? updatedCompany : c
    ));
  };

  const getCompanies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .order('company_name')
        .limit(20);

      if (error) {
        logger.error('Error fetching companies:', error);
      } else {
        setCompanies(data || []);
        setHasMore((data || []).length >= 20);
      }
    } catch (error) {
      logger.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCompanies = async () => {
    if (isLoadingMore || !hasMore) return;

    try {
      setIsLoadingMore(true);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .order('company_name')
        .range(companies.length, companies.length + 19);

      if (error) {
        logger.error('Error loading more companies:', error);
      } else {
        setCompanies(prevCompanies => [...prevCompanies, ...(data || [])]);
        setHasMore((data || []).length >= 20);
      }
    } catch (error) {
      logger.error('Error:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const displayedCompanies = companies.filter((company) => {
    return company.company_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteClick = async (company) => {
    // Check for associated contacts
    const { data: contacts } = await supabase
      .from('contacts')
      .select('id')
      .eq('company_id', company.id);

    const contactCount = contacts?.length || 0;
    let confirmMessage = `Delete company "${company.company_name}"?`;

    if (contactCount > 0) {
      confirmMessage = `${contactCount} contact${contactCount > 1 ? 's are' : ' is'} linked to this company. They will be unlinked. Continue?`;
    }

    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', company.id);

      if (error) {
        const friendlyMessage = handleSupabaseError(error);
        toast.error(friendlyMessage);
        logger.error('Error deleting company:', error);
      } else {
        setCompanies(prevCompanies => prevCompanies.filter(c => c.id !== company.id));
        toast.success(
          contactCount > 0
            ? `Company deleted. ${contactCount} contact${contactCount > 1 ? 's' : ''} unlinked.`
            : 'Company deleted successfully!'
        );
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      logger.error('Error:', error);
    }
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Companies</h1>
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-600">
              {companies.length} {companies.length === 1 ? 'Company' : 'Companies'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Building2 className="w-5 h-5" />
              <span>Add Company</span>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <CompanySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Companies Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              <SkeletonLoader type="card" count={6} />
            </div>
          ) : displayedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {displayedCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onEdit={(company) => {
                    setSelectedCompany(company);
                    setShowEditModal(true);
                  }}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <Building2 className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No companies found' : 'No companies yet'}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {searchTerm
                  ? 'Try adjusting your search criteria'
                  : 'Start by adding your first company to get organized!'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Add Your First Company</span>
                </button>
              )}
            </div>
          )}

          {/* Load More Button for Infinite Scroll */}
          {!loading && displayedCompanies.length > 0 && hasMore && !searchTerm && (
            <div className="flex justify-center p-6 border-t border-gray-200">
              <button
                onClick={loadMoreCompanies}
                disabled={isLoadingMore}
                className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? 'Loading...' : 'Load More Companies'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Company</h2>
            <AddCompanyForm
              user={user}
              onAddCompany={onAddCompany}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Company Modal */}
      {showEditModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Company</h2>
            <EditCompanyModal
              company={selectedCompany}
              onEditCompany={(updatedCompany) => {
                onEditCompany(updatedCompany);
                setShowEditModal(false);
              }}
              onClose={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesContainer;
