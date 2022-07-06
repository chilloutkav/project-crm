class DealSerializer < ActiveModel::Serializer
  attributes :id, :deal_name, :deal_stage, :amount
  has_one :user
  has_one :contact
end
