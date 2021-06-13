class Work < ApplicationRecord
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
  validates :imdb_link, uniqueness: true, if: -> { imdb_link.present? }
  validates_presence_of :year_start, if: -> { year_end.present? }
  validates_presence_of :year_end, if: -> { year_start.present? }
  validates_numericality_of :year_start, only_integer: true, allow_nil: true, less_than_or_equal_to: :year_end
  validates_numericality_of :year_end, only_integer: true, allow_nil: true, greater_than_or_equal_to: :year_start

  before_validation :strip_imdb_link_query_string
  before_validation :populate_year_range

  def deletable
    resources.empty?
  end

  private

  def strip_imdb_link_query_string
    if imdb_link
      self.imdb_link = imdb_link.split('?').first
    end
  end

  def populate_year_range
    # if year_start or year_end is missing, match to other one
    self.year_end = year_start if year_start && !year_end
    self.year_start = year_end if year_end && !year_start
  end
end
