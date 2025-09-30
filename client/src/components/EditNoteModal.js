import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormTextArea, Button, Modal } from "./common";
import { EditIcon, CheckIcon, TagIcon, DocumentIcon } from "./icons";

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
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit Note"
      subtitle="Update note information below"
      icon={EditIcon}
      iconBgColor="bg-purple-600"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="noteTitle"
          label="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Enter note title"
          icon={TagIcon}
          themeColor="purple"
          required
        />

        <FormTextArea
          id="noteDetails"
          label="Note Details"
          value={noteDetails}
          onChange={(e) => setNoteDetails(e.target.value)}
          placeholder="Enter note details..."
          icon={DocumentIcon}
          themeColor="purple"
          rows={6}
          required
        />

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
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="purple"
            icon={CheckIcon}
            loading={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Updating...' : 'Update Note'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditNoteModal;