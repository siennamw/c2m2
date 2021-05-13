class Resource < ApplicationRecord
  scope :active, -> { where(deleted: false) }

  belongs_to :work
  belongs_to :material_format

  has_and_belongs_to_many :collections
  has_many :repositories, through: :collections

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :publication_status, presence: true, inclusion: {
    in: %w(draft provisional approved),
    message: "%{value} is not a valid publication status"
  }
  validate :check_delete

  def deletable
    # always deletable, no dependent data;
    # keeping structures here for consistency and perhaps future use
    true
  end

  private

  def check_delete
    if deleted && !deletable
      errors.add(:base, 'Record has associated works and cannot be deleted')
    end
  end
end
