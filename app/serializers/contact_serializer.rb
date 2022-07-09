class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :lifecycle_stage, :job_title, :company
  has_many :deals
  has_many :notes
  belongs_to :user
end
