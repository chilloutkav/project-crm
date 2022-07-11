class Contact < ApplicationRecord
  belongs_to :user
  has_many :deals, dependent: :destroy
  has_many :notes, through: :deals
end
