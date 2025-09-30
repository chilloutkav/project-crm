import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const EditNoteModal = ({ note, onEditNote, onClose }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Pre-populate form with existing note data
  useEffect(() => {
    if (note) {
      setNoteTitle(note.title || "");
      setNoteDetails(note.details || "");
    }
  }, [note]);

  const closeModalHandler = () => {
    onClose();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('notes')
        .update({
          title: noteTitle,
          details: noteDetails,
        })
        .eq('id', note.id)
        .select();

      if (error) {
        console.error('Error updating note:', error);
        setErrors([error.message]);
      } else {
        onEditNote(data[0]);
        closeModalHandler();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Note</h2>
            <p className="mt-2 text-gray-600">Update note information below</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Note Title */}
            <div>
              <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Note Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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
                Note Details
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <textarea
                  id="noteDetails"
                  value={noteDetails}
                  onChange={(e) => setNoteDetails(e.target.value)}
                  rows={6}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none"
                  placeholder="Enter note details..."
                  required
                />
              </div>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-800">{error}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={closeModalHandler}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Update Note</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;