import React, { useEffect, useState } from "react";
import AddContactForm from "./AddContactForm";
import ContactSearch from "./ContactSearch";
import ContactsList from "./ContactsList";
import { supabase } from "../supabaseClient";

const ContactsContainer = ({ user }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onAddContact = (newContact) => {
    const displayedContacts = [...contacts, newContact];
    setContacts(displayedContacts);
  };

  const getContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addContactModal = () => {
    document.querySelector(".addContactModal").style.display = "flex";
  };

  const displayedContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Contacts</h1>
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-600">
              {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}
            </p>
            <button 
              onClick={addContactModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <ContactSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Contacts Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <ContactsList contacts={displayedContacts} />
        </div>

        {/* Add Contact Modal */}
        <AddContactForm onAddContact={onAddContact} user={user} />
      </div>
    </div>
  );
};

export default ContactsContainer;
