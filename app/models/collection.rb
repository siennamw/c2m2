class Collection < ApplicationRecord
  belongs_to :repository
  belongs_to :cataloger
  has_and_belongs_to_many :works

  validates :name, presence: true, uniqueness: true
end
