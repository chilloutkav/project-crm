class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :password, :password_confirmation

  has_many :contacts
  has_many :notes, through: :contacts
  has_many :deals
end
