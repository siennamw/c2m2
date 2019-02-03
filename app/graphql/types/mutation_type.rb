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
  field :signInCataloger, function: Resolvers::SignInCataloger.new

  field :handleContactForm, function: Resolvers::HandleContactForm.new
  field :handleSuggestionForm, function: Resolvers::HandleSuggestionForm.new
end
