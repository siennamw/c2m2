Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :allCatalogers, function: Resolvers::SearchCatalogers
  field :cataloger, function: Resolvers::FetchCatalogerById.new

  field :allCollections, function: Resolvers::SearchCollections
  field :collection, function: Resolvers::FetchCollectionById.new

  field :allComposers, function: Resolvers::SearchComposers
  field :composer, function: Resolvers::FetchComposerById.new

  field :allCountries, function: Resolvers::SearchCountries
  field :country, function: Resolvers::FetchCountryById.new

  field :allDirectors, function: Resolvers::SearchDirectors
  field :director, function: Resolvers::FetchDirectorById.new

  field :allMaterialFormats, function: Resolvers::SearchMaterialFormats
  field :material_format, function: Resolvers::FetchMaterialFormatById.new

  field :allMediaTypes, function: Resolvers::SearchMediaTypes
  field :media_type, function: Resolvers::FetchMediaTypeById.new

  field :allProductionCompanies, function: Resolvers::SearchProductionCompanies
  field :production_company, function: Resolvers::FetchProductionCompanyById.new

  field :allRepositories, function: Resolvers::SearchRepositories
  field :repository, function: Resolvers::FetchRepositoryById.new

  field :allResources, function: Resolvers::SearchResources
  field :resource, function: Resolvers::FetchResourceById.new

  field :allWorks, function: Resolvers::SearchWorks
  field :work, function: Resolvers::FetchWorkById.new
end
