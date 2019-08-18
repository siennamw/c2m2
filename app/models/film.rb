class Film < ApplicationRecord
  belongs_to :country, optional: true
  belongs_to :media_type

  has_many :resources

  has_and_belongs_to_many :composers
  has_and_belongs_to_many :orchestrators,
    class_name: 'Composer',
    join_table: 'orchestrators_films',
    foreign_key: 'composer_id',
    association_foreign_key: 'film_id'
  has_and_belongs_to_many :directors
  has_and_belongs_to_many :production_companies

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates_presence_of :title
  validates_presence_of :year
end
