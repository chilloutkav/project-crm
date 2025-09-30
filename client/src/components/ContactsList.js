import React from "react";
import ContactCard from "./ContactCard";
import { EmptyState } from "./common";
import { UsersIcon } from "./icons";

const ContactsList = ({ contacts }) => {
  if (contacts.length === 0) {
    return (
      <EmptyState
        icon={<UsersIcon />}
        title="No contacts found"
        description="Get started by adding your first contact."
      />
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactsList;