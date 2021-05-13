Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createCataloger, function: Resolvers::CreateCataloger.new
  field :createCollection, function: Resolvers::CreateCollection.new
  field :createComposer, function: Resolvers::CreateComposer.new
  field :createCountry, function: Resolvers::CreateCountry.new
  field :createDirector, function: Resolvers::CreateDirector.new
  field :createWork, function: Resolvers::CreateWork.new
  field :createMaterialFormat, function: Resolvers::CreateMaterialFormat.new
  field :createMediaType, function: Resolvers::CreateMediaType.new
  field :createProductionCompany, function: Resolvers::CreateProductionCompany.new
  field :createRepository, function: Resolvers::CreateRepository.new
  field :createResource, function: Resolvers::CreateResource.new

  field :toggleDeleteCollection, function: Resolvers::ToggleDeleteCollection.new
  field :toggleDeleteComposer, function: Resolvers::ToggleDeleteComposer.new
  field :toggleDeleteCountry, function: Resolvers::ToggleDeleteCountry.new
  field :toggleDeleteDirector, function: Resolvers::ToggleDeleteDirector.new
  field :toggleDeleteMaterialFormat, function: Resolvers::ToggleDeleteMaterialFormat.new
  field :toggleDeleteMediaType, function: Resolvers::ToggleDeleteMediaType.new
  field :toggleDeleteProductionCompany, function: Resolvers::ToggleDeleteProductionCompany.new
  field :toggleDeleteRepository, function: Resolvers::ToggleDeleteRepository.new
  field :toggleDeleteResource, function: Resolvers::ToggleDeleteResource.new
  field :toggleDeleteWork, function: Resolvers::ToggleDeleteWork.new

  field :updateCatalogerAdmin, function: Resolvers::UpdateCatalogerAdmin.new
  field :updateCatalogerSelf, function: Resolvers::UpdateCatalogerSelf.new
  field :updateCollection, function: Resolvers::UpdateCollection.new
  field :updateComposer, function: Resolvers::UpdateComposer.new
  field :updateCountry, function: Resolvers::UpdateCountry.new
  field :updateDirector, function: Resolvers::UpdateDirector.new
  field :updateWork, function: Resolvers::UpdateWork.new
  field :updateMaterialFormat, function: Resolvers::UpdateMaterialFormat.new
  field :updateMediaType, function: Resolvers::UpdateMediaType.new
  field :updateProductionCompany, function: Resolvers::UpdateProductionCompany.new
  field :updateRepository, function: Resolvers::UpdateRepository.new
  field :updateResource, function: Resolvers::UpdateResource.new

  field :signInCataloger, function: Resolvers::SignInCataloger.new
  field :getResetPasswordToken, function: Resolvers::GetResetPasswordToken.new
  field :resetPassword, function: Resolvers::ResetPassword.new

  field :handleContactForm, function: Resolvers::HandleContactForm.new
  field :handleSuggestionForm, function: Resolvers::HandleSuggestionForm.new

  field :bulkUpload, function: Resolvers::BulkUpload.new
end
