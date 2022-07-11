class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :lifecycle_stage, :job_title, :company
  has_many :deals
  belongs_to :user
end
