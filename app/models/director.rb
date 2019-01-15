class Director < ApplicationRecord
  has_and_belongs_to_many :works

  validates_presence_of :name
end
