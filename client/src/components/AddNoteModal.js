import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddNoteModal = ({ deal, getDeal, onClose }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");

  const closeModalHandler = () => {
    onClose();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title: noteTitle,
          details: noteDetails,
          deal_id: deal.id,
        }
      ])
      .select();

    if (error) {
      console.error('Error adding note:', error);
    } else {
      e.target.reset();
      closeModalHandler();
    }

    getDeal();
  }

  return (
    <div className="addNoteModal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Note</h2>
            <p className="mt-2 text-gray-600">Add a note to track this deal's progress</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Note Title */}
            <div>
              <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Note Title *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v1M7 4V3a1 1 0 011-1v0M7 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1h-4" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="noteTitle"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                  placeholder="Enter note title"
                  required
                />
              </div>
            </div>

            {/* Note Details */}
            <div>
              <label htmlFor="noteDetails" className="block text-sm font-medium text-gray-700 mb-2">
                Details *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <textarea
                  id="noteDetails"
                  value={noteDetails}
                  onChange={(e) => setNoteDetails(e.target.value)}
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none"
                  placeholder="Enter note details..."
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={closeModalHandler}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Note</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
