class MediaType < ApplicationRecord
  has_many :works
  validates :name, presence: true, uniqueness: true
end
