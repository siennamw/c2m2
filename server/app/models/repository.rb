class Repository < ApplicationRecord
  has_many :collections

  validates_presence_of :name
  validates_presence_of :location
end
