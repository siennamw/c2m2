class ProductionCompany < ApplicationRecord
  has_and_belongs_to_many :works

  belongs_to :created_by, class_name: 'Cataloger'
  belongs_to :updated_by, class_name: 'Cataloger', optional: true

  validates :name, presence: true, uniqueness: true
  def deletable
    works.empty?
  end

  private

  def check_deletable
    unless deletable
      errors.add(:base, 'Record has associated works and cannot be deleted')
      throw(:abort)
    end
  end
end
