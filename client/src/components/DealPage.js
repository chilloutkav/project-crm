import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AddDealModal from "./AddDealModal";
import AddNoteModal from "./AddNoteModal";
import EditDealForm from "./EditDealForm";
import NotesCard from "./NotesCard";
import { supabase } from "../supabaseClient";

const DealPage = () => {
  const [deal, setDeal] = useState({ notes: [], contact: [], amount: "" });
  const [showEdit, setShowEdit] = useState(true);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const { id } = useParams();

  function editButtonHandler() {
    setShowEdit(!showEdit);
  }

  const addNoteModal = () => {
    setShowNoteModal(true);
  };

  const getDeal = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          contact:contacts(*),
          notes(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching deal:', error);
      } else {
        setDeal(data || { notes: [], contact: {}, amount: "" });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getDeal();
  }, []);

  console.log(deal);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{deal.deal_name}</h1>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {deal.deal_stage}
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ${deal.amount?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
            <button
              onClick={editButtonHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Deal</span>
            </button>
          </div>
        </div>

        {/* Deal Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contact Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h3>
            <div className="space-y-3">
              <Link
                to={`/dashboard/contacts/${deal.contact?.id}`}
                className="block hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
              >
                <p className="font-semibold text-blue-600 hover:text-blue-700">
                  {deal.contact?.name}
                </p>
                <p className="text-gray-600">{deal.contact?.job_title}</p>
                <p className="text-gray-500">{deal.contact?.company}</p>
              </Link>
            </div>
          </div>

          {/* Deal Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Deal Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Stage</label>
                <p className="text-gray-900">{deal.deal_stage}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Value</label>
                <p className="text-gray-900 font-semibold">${deal.amount?.toLocaleString() || '0'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Deal Form */}
        {!showEdit && (
          <div className="mb-8">
            <EditDealForm id={deal.id} getDeal={getDeal} deal={deal} />
          </div>
        )}

        {/* Notes Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Notes ({deal.notes?.length || 0})
              </h2>
              <button
                onClick={addNoteModal}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Note</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {deal.notes && deal.notes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deal.notes.map((note, index) => (
                  <div key={note.id || index}>
                    <NotesCard note={note} amount={deal.amount} getDeal={getDeal} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">No notes yet. Add your first note to track this deal's progress.</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Note Modal */}
        {showNoteModal && (
          <AddNoteModal
            deal={deal}
            getDeal={getDeal}
            onClose={() => setShowNoteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DealPage;
