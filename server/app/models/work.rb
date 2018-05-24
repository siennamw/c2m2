class Work < ApplicationRecord
  belongs_to :country
  belongs_to :media_type
  belongs_to :material_format
  belongs_to :cataloger

  has_many :composers

  validates_presence_of :title
end
