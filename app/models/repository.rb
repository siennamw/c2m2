class Repository < ApplicationRecord
  belongs_to :cataloger
  has_many :collections
  has_many :works, through: :collections

  validates_presence_of :name
  validates_presence_of :location
end
