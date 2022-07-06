class Company < ApplicationRecord
  belongs_to :user
  has_many :contacts
  has_many :deals, through: :contacts
end
