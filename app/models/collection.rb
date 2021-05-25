class Collection < ApplicationRecord
  belongs_to :repository
  has_and_belongs_to_many :resources

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :name, presence: true, uniqueness: true

  def deletable
    resources.empty?
  end
end
