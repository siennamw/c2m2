class Country < ApplicationRecord
  belongs_to :cataloger
  has_many :works
  validates :name, presence: true, uniqueness: true
end
