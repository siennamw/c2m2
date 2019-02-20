class Cataloger < ApplicationRecord
  has_secure_password

  has_many :catalogers, foreign_key: 'created_by_id', class_name: 'Cataloger'
  has_many :collections
  has_many :composers
  has_many :countries
  has_many :directors
  has_many :material_formats
  has_many :media_types
  has_many :production_companies
  has_many :publishers
  has_many :repositories
  has_many :works

  belongs_to :created_by, class_name: 'Cataloger', optional: true

  validates :password, length: { minimum: 8 }
  validates_presence_of :name
  validates :email, presence: true, uniqueness: true
end
