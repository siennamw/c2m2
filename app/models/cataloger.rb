class Cataloger < ApplicationRecord
  has_secure_password

  has_many :works
  belongs_to :created_by, class_name: 'Cataloger', optional: true

  validates :password, length: { minimum: 8 }
  validates_presence_of :name
  validates :email, presence: true, uniqueness: true
end
