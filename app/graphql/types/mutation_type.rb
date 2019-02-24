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
  field :createPublisher, function: Resolvers::CreatePublisher.new
  field :createRepository, function: Resolvers::CreateRepository.new
  field :createWork, function: Resolvers::CreateWork.new

  field :updateCataloger, function: Resolvers::UpdateCataloger.new
  field :updateCollection, function: Resolvers::UpdateCollection.new
  field :updateComposer, function: Resolvers::UpdateComposer.new
  field :updateCountry, function: Resolvers::UpdateCountry.new
  field :updateDirector, function: Resolvers::UpdateDirector.new
  field :updateMaterialFormat, function: Resolvers::UpdateMaterialFormat.new
  field :updateMediaType, function: Resolvers::UpdateMediaType.new
  field :updateProductionCompany, function: Resolvers::UpdateProductionCompany.new
  field :updatePublisher, function: Resolvers::UpdatePublisher.new
  field :updateRepository, function: Resolvers::UpdateRepository.new
  field :updateWork, function: Resolvers::UpdateWork.new

  field :signInCataloger, function: Resolvers::SignInCataloger.new

  field :handleContactForm, function: Resolvers::HandleContactForm.new
  field :handleSuggestionForm, function: Resolvers::HandleSuggestionForm.new
end
