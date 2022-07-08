class Company < ApplicationRecord
  belongs_to :user
  has_many :contacts, dependent: :destroy
  has_many :deals, through: :contacts
end
