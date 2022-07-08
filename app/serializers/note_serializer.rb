class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :details
  has_one :contact
end
