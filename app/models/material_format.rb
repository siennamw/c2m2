class MaterialFormat < ApplicationRecord
  scope :active, -> { where(deleted: false) }

  has_many :resources

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :name, presence: true, uniqueness: true
  validate :check_delete

  def deletable
    resources.empty?
  end

  private

  def check_delete
    if deleted && !deletable
      errors.add(:base, 'Record has associated resources and cannot be deleted')
    end
  end
end
