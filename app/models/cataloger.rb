class Cataloger < ApplicationRecord
  has_secure_password

  has_many :catalogers, foreign_key: 'created_by_id', class_name: 'Cataloger'
  has_many :collections, foreign_key: 'created_by_id', class_name: 'Collection'
  has_many :composers, foreign_key: 'created_by_id', class_name: 'Composer'
  has_many :countries, foreign_key: 'created_by_id', class_name: 'Country'
  has_many :directors, foreign_key: 'created_by_id', class_name: 'Director'
  has_many :films, foreign_key: 'created_by_id', class_name: 'Film'
  has_many :material_formats, foreign_key: 'created_by_id', class_name: 'MaterialFormat'
  has_many :media_types, foreign_key: 'created_by_id', class_name: 'MediaType'
  has_many :production_companies, foreign_key: 'created_by_id', class_name: 'ProductionCompany'
  has_many :repositories, foreign_key: 'created_by_id', class_name: 'Repository'
  has_many :works, foreign_key: 'created_by_id', class_name: 'Work'

  has_many :catalogers_as_updater, foreign_key: 'updated_by_id', class_name: 'Cataloger'
  has_many :collections_as_updater, foreign_key: 'updated_by_id', class_name: 'Collection'
  has_many :composers_as_updater, foreign_key: 'updated_by_id', class_name: 'Composer'
  has_many :countries_as_updater, foreign_key: 'updated_by_id', class_name: 'Country'
  has_many :directors_as_updater, foreign_key: 'updated_by_id', class_name: 'Director'
  has_many :films_as_updater, foreign_key: 'updated_by_id', class_name: 'Film'
  has_many :material_formats_as_updater, foreign_key: 'updated_by_id', class_name: 'MaterialFormat'
  has_many :media_types_as_updater, foreign_key: 'updated_by_id', class_name: 'MediaType'
  has_many :production_companies_as_updater, foreign_key: 'updated_by_id', class_name: 'ProductionCompany'
  has_many :repositories_as_updater, foreign_key: 'updated_by_id', class_name: 'Repository'
  has_many :works_as_updater, foreign_key: 'updated_by_id', class_name: 'Work'

  belongs_to :created_by, class_name: 'Cataloger', optional: true
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :password, length: { minimum: 8 }
  validates_presence_of :name
  validates :email, presence: true, uniqueness: true
end
