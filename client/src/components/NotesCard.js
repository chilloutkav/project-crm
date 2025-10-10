import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import EditNoteModal from "./EditNoteModal";
import { formatDate } from "../utils/formatters";
import logger from "../utils/logger";

const NotesCard = ({ note, getDeal, onDeleteNote, onEditNote }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    setIsDeleting(true);

    // Store original note for rollback
    const deletedNote = { ...note };

    // Optimistically remove from UI if callback provided
    if (onDeleteNote) {
      onDeleteNote({ id: note.id, _shouldRemove: true });
    }

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', note.id);

      if (error) {
        // Rollback: restore the note
        if (onDeleteNote) {
          onDeleteNote(deletedNote);
        }
        logger.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
      } else {
        if (!onDeleteNote) {
          // Fallback to old behavior
          getDeal();
        }
      }
    } catch (error) {
      // Rollback: restore the note
      if (onDeleteNote) {
        onDeleteNote(deletedNote);
      }
      logger.error('Error:', error);
      alert('Failed to delete note. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditNote = (updatedNote) => {
    setShowEditModal(false);
    if (onEditNote) {
      onEditNote(updatedNote);
    } else {
      getDeal(); // Fallback to old behavior
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {note.title}
            </h3>
            {note.created_at && (
              <p className="text-sm text-gray-500">
                {formatDate(note.created_at)}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
            title="Edit note"
            aria-label="Edit note"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete note"
            aria-label="Delete note"
          >
            {isDeleting ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {note.details}
        </p>
      </div>

      {/* Edit Note Modal */}
      {showEditModal && (
        <EditNoteModal
          note={note}
          onEditNote={handleEditNote}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default NotesCard;
