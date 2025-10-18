import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Building2, ArrowLeft } from "lucide-react";
import { supabase } from "../supabaseClient";
import EditCompanyModal from "./EditCompanyModal";
import SkeletonLoader from "./common/SkeletonLoader";
import { useToast } from "../contexts/ToastContext";
import { handleSupabaseError } from "../utils/errorHandler";
import logger from "../utils/logger";

const CompanyPage = () => {
  const [company, setCompany] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const getCompany = async () => {
    try {
      setLoading(true);

      // Fetch company details
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();

      if (companyError) {
        logger.error('Error fetching company:', companyError);
        return;
      }

      // Fetch associated contacts with JOIN to get company info
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*, companies(company_name, id)')
        .eq('company_id', id);

      if (contactsError) {
        logger.error('Error fetching contacts:', contactsError);
      }

      setCompany(companyData);
      setContacts(contactsData || []);
    } catch (error) {
      logger.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async () => {
    // Check for associated contacts
    const { data: linkedContacts } = await supabase
      .from('contacts')
      .select('id')
      .eq('company_id', id);

    const contactCount = linkedContacts?.length || 0;
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
        .eq('id', id);

      if (error) {
        toast.error(handleSupabaseError(error));
        logger.error('Error deleting company:', error);
      } else {
        toast.success(
          contactCount > 0
            ? `Company deleted. ${contactCount} contact${contactCount > 1 ? 's' : ''} unlinked.`
            : 'Company deleted successfully!'
        );
        navigate('/dashboard/companies');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      logger.error('Error:', error);
    }
  };

  useEffect(() => {
    if (id) {
      getCompany();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="mb-8 h-20 bg-gray-200 rounded animate-pulse"></div>

          {/* Company Information Cards Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <SkeletonLoader type="profile" />
            <SkeletonLoader type="info-card" count={2} />
          </div>

          {/* Contacts Section Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <SkeletonLoader type="list" count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Company not found</h2>
          <p className="text-gray-600 mb-4">The company you're looking for doesn't exist.</p>
          <Link
            to="/dashboard/companies"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  const handleEditCompany = (updatedCompany) => {
    setCompany(updatedCompany);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/dashboard/companies"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Companies
        </Link>

        {/* Company Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-orange-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{company.company_name}</h1>
                <p className="text-gray-600 mt-2">Created {new Date(company.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={handleDeleteCompany}
                className="bg-red-50 hover:bg-red-100 text-red-600 border-2 border-red-200 px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Company Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            {company.owner_name && (
              <div>
                <span className="text-sm font-medium text-gray-500">Owner</span>
                <p className="text-lg font-semibold text-gray-900 mt-1">{company.owner_name}</p>
              </div>
            )}

            {company.annual_rev && (
              <div>
                <span className="text-sm font-medium text-gray-500">Annual Revenue</span>
                <p className="text-lg font-semibold text-gray-900 mt-1">{company.annual_rev}</p>
              </div>
            )}

            {company.description && (
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-gray-500">Description</span>
                <p className="text-base text-gray-900 mt-2 whitespace-pre-wrap">{company.description}</p>
              </div>
            )}

            {!company.owner_name && !company.annual_rev && !company.description && (
              <p className="text-gray-500 italic col-span-2">No additional details available. Edit to add more information.</p>
            )}
          </div>
        </div>

        {/* Associated Contacts Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contacts at {company.company_name}
          </h2>

          {contacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <Link
                  key={contact.id}
                  to={`/dashboard/contacts/${contact.id}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-orange-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {contact.image_url ? (
                        <img
                          src={contact.image_url}
                          alt={contact.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-blue-600 font-bold">
                          {contact.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate hover:text-orange-600 transition-colors">
                        {contact.name}
                      </h3>
                      {contact.job_title && (
                        <p className="text-sm text-gray-600 truncate">{contact.job_title}</p>
                      )}
                      {contact.email && (
                        <p className="text-sm text-blue-600 truncate">{contact.email}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts yet</h3>
              <p className="text-gray-600">
                Contacts will appear here once they're associated with this company.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Company Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Company</h2>
            <EditCompanyModal
              company={company}
              onEditCompany={handleEditCompany}
              onClose={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
