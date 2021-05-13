class Repository < ApplicationRecord
  scope :active, -> { where(deleted: false) }

  has_many :collections
  has_many :resources, through: :collections

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :name, presence: true, uniqueness: true
  validates_presence_of :location
  validate :check_delete

  def deletable
    collections.empty?
  end

  private

  def check_delete
    if deleted && !deletable
      errors.add(:base, 'Record has associated collections and cannot be deleted')
    end
  end
end
