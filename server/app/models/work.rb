class Work < ApplicationRecord
  belongs_to :country
  belongs_to :media_type
  belongs_to :material_format
  belongs_to :cataloger

  has_and_belongs_to_many :composers
  has_and_belongs_to_many :directors

  validates_presence_of :title
end
