class Composer < ApplicationRecord
  has_and_belongs_to_many :films
  has_and_belongs_to_many :films_as_orchestrator,
    class_name: 'Film',
    join_table: 'orchestrators_films',
    foreign_key: 'film_id',
    association_foreign_key: 'composer_id'

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates_presence_of :name
end
