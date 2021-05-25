class Director < ApplicationRecord
  has_and_belongs_to_many :works

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :name, presence: true, uniqueness: true
  validates :imdb_link, uniqueness: true, if: -> { imdb_link.present? }

  before_validation :strip_imdb_link_query_string

  def deletable
    works.empty?
  end

  private

  def strip_imdb_link_query_string
    if imdb_link
      self.imdb_link = imdb_link.split('?').first
    end
  end
end
