import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { FormInput, FormTextArea, Button, Modal } from "./common";
import { PlusIcon, TagIcon, DocumentIcon } from "./icons";

const AddNoteModal = ({ deal, getDeal, onClose }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");

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
      onClose();
    }

    getDeal();
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
          label="Details"
          value={noteDetails}
          onChange={(e) => setNoteDetails(e.target.value)}
          placeholder="Enter note details..."
          icon={DocumentIcon}
          themeColor="purple"
          rows={4}
          required
        />

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
            icon={PlusIcon}
            className="flex-1"
          >
            Add Note
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;