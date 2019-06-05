class ProductionCompany < ApplicationRecord
  has_and_belongs_to_many :films

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates_presence_of :name
end
