Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createCountry, function: Resolvers::CreateCountry.new
  field :createMediaType, function: Resolvers::CreateMediaType.new
  field :createMaterialFormat, function: Resolvers::CreateMaterialFormat.new
  field :createCataloger, function: Resolvers::CreateCataloger.new
end
