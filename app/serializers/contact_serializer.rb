class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image_url, :job_title, :company
  has_many :deals
  belongs_to :user
end
