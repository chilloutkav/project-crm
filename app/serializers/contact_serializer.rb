class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :lifecycle_stage, :job_title
  has_one :user
  has_one :company
end
