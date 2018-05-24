class Director < ApplicationRecord
  has_many :works
  validates_presence_of :name
end
