class Repository < ApplicationRecord
  has_many :collections
  has_many :resources, through: :collections

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates_presence_of :name
  validates_presence_of :location
end
