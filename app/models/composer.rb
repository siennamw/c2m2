class Composer < ApplicationRecord
  belongs_to :cataloger
  has_and_belongs_to_many :works
  has_and_belongs_to_many :works_as_orchestrator,
    class_name: 'Work',
    join_table: 'orchestrators_works',
    foreign_key: 'work_id',
    association_foreign_key: 'composer_id'

  validates_presence_of :name
end
