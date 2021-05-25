class Country < ApplicationRecord
  has_many :works

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :name, presence: true, uniqueness: true

  def deletable
    works.empty?
  end
end
