class Event < ApplicationRecord
  belongs_to :created_by, class_name: 'Cataloger'
  validates :name, presence: true, inclusion: {
    in: %w[
      CreateCataloger
      CreateCollection
      CreateComposer
      CreateCountry
      CreateDirector
      CreateMaterialFormat
      CreateMediaType
      CreateProductionCompany
      CreateRepository
      CreateResource
      CreateWork
      DeleteCollection
      DeleteComposer
      DeleteCountry
      DeleteDirector
      DeleteMaterialFormat
      DeleteMediaType
      DeleteProductionCompany
      DeleteRepository
      DeleteResource
      DeleteWork
      GetResetPasswordToken
      ResetPassword
      UpdateCatalogerAdmin
      UpdateCatalogerSelf
      UpdateCollection
      UpdateComposer
      UpdateCountry
      UpdateDirector
      UpdateMaterialFormat
      UpdateMediaType
      UpdateProductionCompany
      UpdateRepository
      UpdateResource
      UpdateWork
    ],
    message: "%{value} is not a valid event name"
  }
  validates_presence_of :entity_id
end
