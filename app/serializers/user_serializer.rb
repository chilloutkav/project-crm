class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name

  has_many :contacts
  has_many :notes, through: :contacts
  has_many :deals
end
