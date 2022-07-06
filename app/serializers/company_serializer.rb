class CompanySerializer < ActiveModel::Serializer
  attributes :id, :company_name, :owner_name, :description, :annual_rev
  has_one :user
end
