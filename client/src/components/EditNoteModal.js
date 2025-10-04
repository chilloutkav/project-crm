import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormTextArea, Button, Modal } from "./common";
import { EditIcon, CheckIcon, TagIcon, DocumentIcon } from "./icons";
import { validateData, noteSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const EditNoteModal = ({ note, onEditNote, onClose }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useToast();

  // Pre-populate form with existing note data
  useEffect(() => {
    if (note) {
      setNoteTitle(note.title || "");
      setNoteDetails(note.details || "");
    }
  }, [note]);

  const validateForm = () => {
    const { success, errors } = validateData(noteSchema, {
      title: noteTitle,
      details: noteDetails
    });

    setValidationErrors(errors);
    return success;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

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
        const friendlyMessage = handleSupabaseError(error);
        toast.error(friendlyMessage);
        logger.error('Error updating note:', error);
      } else {
        toast.success('Note updated successfully!');
        onEditNote(data[0]);
        onClose();
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      logger.error('Error:', error);
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
        <div>
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
          {validationErrors.title && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
          )}
        </div>

        <div>
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
          {validationErrors.details && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.details}</p>
          )}
        </div>

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