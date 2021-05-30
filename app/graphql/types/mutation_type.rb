Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createCataloger, function: Resolvers::CreateCataloger.new
  field :createCollection, function: Resolvers::CreateCollection.new
  field :createComposer, function: Resolvers::CreateComposer.new
  field :createCountry, function: Resolvers::CreateCountry.new
  field :createDirector, function: Resolvers::CreateDirector.new
  field :createMaterialFormat, function: Resolvers::CreateMaterialFormat.new
  field :createMediaType, function: Resolvers::CreateMediaType.new
  field :createProductionCompany, function: Resolvers::CreateProductionCompany.new
  field :createRepository, function: Resolvers::CreateRepository.new
  field :createResource, function: Resolvers::CreateResource.new
  field :createWork, function: Resolvers::CreateWork.new

  field :deleteCollection, function: Resolvers::DeleteCollection.new
  field :deleteComposer, function: Resolvers::DeleteComposer.new
  field :deleteCountry, function: Resolvers::DeleteCountry.new
  field :deleteDirector, function: Resolvers::DeleteDirector.new
  field :deleteMaterialFormat, function: Resolvers::DeleteMaterialFormat.new
  field :deleteMediaType, function: Resolvers::DeleteMediaType.new
  field :deleteProductionCompany, function: Resolvers::DeleteProductionCompany.new
  field :deleteRepository, function: Resolvers::DeleteRepository.new
  field :deleteResource, function: Resolvers::DeleteResource.new
  field :deleteWork, function: Resolvers::DeleteWork.new

  field :updateCatalogerAdmin, function: Resolvers::UpdateCatalogerAdmin.new
  field :updateCatalogerSelf, function: Resolvers::UpdateCatalogerSelf.new
  field :updateCollection, function: Resolvers::UpdateCollection.new
  field :updateComposer, function: Resolvers::UpdateComposer.new
  field :updateCountry, function: Resolvers::UpdateCountry.new
  field :updateDirector, function: Resolvers::UpdateDirector.new
  field :updateMaterialFormat, function: Resolvers::UpdateMaterialFormat.new
  field :updateMediaType, function: Resolvers::UpdateMediaType.new
  field :updateProductionCompany, function: Resolvers::UpdateProductionCompany.new
  field :updateRepository, function: Resolvers::UpdateRepository.new
  field :updateResource, function: Resolvers::UpdateResource.new
  field :updateWork, function: Resolvers::UpdateWork.new

  field :getResetPasswordToken, function: Resolvers::GetResetPasswordToken.new
  field :resetPassword, function: Resolvers::ResetPassword.new
  field :signInCataloger, function: Resolvers::SignInCataloger.new

  field :handleContactForm, function: Resolvers::HandleContactForm.new
  field :handleSuggestionForm, function: Resolvers::HandleSuggestionForm.new

  field :bulkUpload, function: Resolvers::BulkUpload.new
end
