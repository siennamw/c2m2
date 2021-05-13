class Work < ApplicationRecord
  scope :active, -> { where(deleted: false) }

  belongs_to :country, optional: true
  belongs_to :media_type

  has_many :resources

  has_and_belongs_to_many :composers
  has_and_belongs_to_many :orchestrators,
    class_name: 'Composer',
    join_table: 'orchestrators_works',
    foreign_key: 'work_id',
    association_foreign_key: 'composer_id'
  has_and_belongs_to_many :directors
  has_and_belongs_to_many :production_companies

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates_presence_of :title
  validates_presence_of :year
  validates :imdb_link, uniqueness: true, if: -> { imdb_link.present? }
  validate :check_delete

  before_validation :strip_imdb_link_query_string

  def deletable
    resources.empty?
  end

  private

  def check_delete
    if deleted && !deletable
      errors.add(:base, 'Record has associated resources and cannot be deleted')
    end
  end

  def strip_imdb_link_query_string
    if self.imdb_link
      self.imdb_link = self.imdb_link.split('?').first
    end
  end
end
