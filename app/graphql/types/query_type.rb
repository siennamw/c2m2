Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :allCatalogers do
    type types[Types::CatalogerType]
    description "A list of all catalogers"
    resolve ->(obj, args, ctx) { Cataloger.order(name: :asc).all }
  end

  field :cataloger do
    type Types::CatalogerType
    description "Cataloger by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Cataloger.find(args[:id]) }
  end

  field :allCollections, function: Resolvers::SearchCollections

  field :collection do
    type Types::CollectionType
    description "Collection by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Collection.find(args[:id]) }
  end

  field :allComposers, function: Resolvers::SearchComposers

  field :composer do
    type Types::ComposerType
    description "Composer by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Composer.find(args[:id]) }
  end

  field :allCountries, function: Resolvers::SearchCountries

  field :country do
    type Types::CountryType
    description "Country by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Country.find(args[:id]) }
  end

  field :allDirectors, function: Resolvers::SearchDirectors

  field :director do
    type Types::DirectorType
    description "Director by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Director.find(args[:id]) }
  end

  field :allWorks, function: Resolvers::SearchWorks

  field :work do
    type Types::WorkType
    description "Work by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Work.find(args[:id]) }
  end

  field :allMaterialFormats do
    type types[Types::MaterialFormatType]
    description "A list of all material formats"
    resolve ->(obj, args, ctx) { MaterialFormat.order(name: :asc).all }
  end

  field :material_format do
    type Types::MaterialFormatType
    description "Material format by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { MaterialFormat.find(args[:id]) }
  end

  field :allMediaTypes do
    type types[Types::MediaTypeType]
    description "A list of all media types"
    resolve ->(obj, args, ctx) { MediaType.order(name: :asc).all }
  end

  field :media_type do
    type Types::MediaTypeType
    description "Media type by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { MediaType.find(args[:id]) }
  end

  field :allProductionCompanies, function: Resolvers::SearchProductionCompanies

  field :production_company do
    type Types::ProductionCompanyType
    description "Production company by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { ProductionCompany.find(args[:id]) }
  end

  field :allRepositories, function: Resolvers::SearchRepositories

  field :repository do
    type Types::RepositoryType
    description "Repository by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Repository.find(args[:id]) }
  end

  field :allResources do
    type types[Types::ResourceType]
    description "A list of all resources"
    resolve ->(obj, args, ctx) { Resource.order(material_format: :asc).all }
  end

  field :resource do
    type Types::ResourceType
    description "Resource by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) {
      resource = Resource.find(args[:id])

      # filter out draft entries if user not authenticated
      if resource.publication_status === 'draft' && !ctx[:current_user]
        raise ActiveRecord::RecordNotFound
      end

      resource
    }
  end
end
