import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import EditContactModal from "./EditContactModal";

const ContactsPage = () => {
  const [contact, setContact] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const { id } = useParams();

  const getContact = async () => {
    try {
      setLoading(true);

      // Fetch contact details
      const { data: contactData, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

      if (contactError) {
        console.error('Error fetching contact:', contactError);
        return;
      }

      // Fetch associated deals
      const { data: dealsData, error: dealsError } = await supabase
        .from('deals')
        .select('*')
        .eq('contact_id', id);

      if (dealsError) {
        console.error('Error fetching deals:', dealsError);
      }

      setContact(contactData);
      setDeals(dealsData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getContact();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact not found</h2>
          <p className="text-gray-600 mb-4">The contact you're looking for doesn't exist.</p>
          <Link
            to="/dashboard/contacts"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Contacts
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleEditContact = (updatedContact) => {
    setContact(updatedContact);
    setShowEditModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard/contacts"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Back to Contacts"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{contact.name}</h1>
                <p className="text-gray-600 mt-1">Contact Details</p>
              </div>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Contact</span>
            </button>
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 ring-4 ring-gray-50">
                {contact.image_url ? (
                  <img
                    src={contact.image_url}
                    alt={contact.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl ${contact.image_url ? 'hidden' : 'flex'}`}>
                  {contact.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{contact.name}</h2>
              <p className="text-blue-600 font-medium">{contact.job_title}</p>
              <p className="text-gray-600">{contact.company}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-gray-900 hover:text-blue-600 transition-colors duration-200"
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Company</label>
                <p className="text-gray-900">{contact.company || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Job Title</label>
                <p className="text-gray-900">{contact.job_title || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Deal Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Deal Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Total Deals</span>
                <span className="text-lg font-bold text-gray-900">{deals.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Total Value</span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(deals.reduce((sum, deal) => sum + (deal.amount || 0), 0))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Associated Deals ({deals.length})
            </h2>
          </div>

          <div className="p-6">
            {deals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((deal) => (
                  <div key={deal.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300">
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-900 mb-2">{deal.deal_name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {deal.deal_stage}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(deal.amount)}
                      </span>
                    </div>
                    <Link to={`/dashboard/deals/${deal.id}`}>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>View Details</span>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <p className="text-gray-500">No deals associated with this contact yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Contact Modal */}
        {showEditModal && (
          <EditContactModal
            contact={contact}
            onEditContact={handleEditContact}
            onClose={handleCloseEditModal}
          />
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
