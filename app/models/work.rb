class Work < ApplicationRecord
  belongs_to :country, optional: true
  belongs_to :media_type
  belongs_to :material_format

  has_and_belongs_to_many :collections
  has_many :repositories, through: :collections
  has_and_belongs_to_many :composers
  has_and_belongs_to_many :orchestrators,
    class_name: 'Composer',
    join_table: 'orchestrators_works',
    foreign_key: 'composer_id',
    association_foreign_key: 'work_id'
  has_and_belongs_to_many :directors
  has_and_belongs_to_many :production_companies
  has_and_belongs_to_many :publishers

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates_presence_of :title
  validates_presence_of :year
  validates :publication_status, presence: true, inclusion: {
    in: %w(draft provisional approved),
    message: "%{value} is not a valid publication status"
  }
end
