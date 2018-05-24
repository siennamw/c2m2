class Cataloger < ApplicationRecord
  has_many :works
  validates_presence_of :name
  validates :email, presence: true, uniqueness: true
end
