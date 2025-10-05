import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormTextArea, Button, Modal } from "./common";
import { PlusIcon, TagIcon, DocumentIcon } from "./icons";
import { validateData, noteSchema } from "../utils/validation";
import { handleSupabaseError } from "../utils/errorHandler";
import { useToast } from "../contexts/ToastContext";
import logger from "../utils/logger";

const AddNoteModal = ({ deal, getDeal, onAddNote, onClose }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

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

    setIsSubmitting(true);

    // Create optimistic note with temporary ID
    const tempId = `temp-${Date.now()}`;
    const optimisticNote = {
      id: tempId,
      title: noteTitle,
      details: noteDetails,
      deal_id: deal.id,
      created_at: new Date().toISOString()
    };

    // Optimistically update UI if callback provided, otherwise fallback to getDeal
    if (onAddNote) {
      onAddNote(optimisticNote);
      onClose();
      toast.success('Note added successfully!');
    }

    // Make API call
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

    setIsSubmitting(false);

    if (error) {
      // Rollback: remove optimistic note and show error
      if (onAddNote) {
        onAddNote({ ...optimisticNote, _shouldRemove: true });
      }
      const friendlyMessage = handleSupabaseError(error);
      toast.error(friendlyMessage);
      logger.error('Error adding note:', error);
    } else {
      if (onAddNote) {
        // Replace optimistic note with real data
        onAddNote({ ...data[0], _replaceId: tempId });
      } else {
        // Fallback to old behavior
        toast.success('Note added successfully!');
        e.target.reset();
        getDeal();
        onClose();
      }
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Add New Note"
      subtitle="Add a note to track this deal's progress"
      icon={DocumentIcon}
      iconBgColor="bg-purple-600"
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
            label="Details"
            value={noteDetails}
            onChange={(e) => setNoteDetails(e.target.value)}
            placeholder="Enter note details..."
            icon={DocumentIcon}
            themeColor="purple"
            rows={4}
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
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="purple"
            icon={PlusIcon}
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Note'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;