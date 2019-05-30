Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :selfIsAdmin do
    type types.Boolean
    description "The user making the request is an admin"
    resolve ->(obj, args, ctx){ ctx[:current_user].admin }
  end

  field :allCatalogers do
    type types[Types::CatalogerType]
    description "A list of all catalogers"
    resolve ->(obj, args, ctx) { Cataloger.all }
  end

  field :cataloger do
    type Types::CatalogerType
    description "Cataloger by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Cataloger.find(args[:id]) }
  end

  field :allCollections do
    type types[Types::CollectionType]
    description "A list of all collections"
    resolve ->(obj, args, ctx) { Collection.all }
  end

  field :collection do
    type Types::CollectionType
    description "Collection by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Collection.find(args[:id]) }
  end

  field :allComposers do
    type types[Types::ComposerType]
    description "A list of all composers"
    resolve ->(obj, args, ctx) { Composer.all }
  end

  field :composer do
    type Types::ComposerType
    description "Composer by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Composer.find(args[:id]) }
  end

  field :allCountries do
    type types[Types::CountryType]
    description "A list of all countries"
    resolve ->(obj, args, ctx) { Country.all }
  end

  field :country do
    type Types::CountryType
    description "Country by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Country.find(args[:id]) }
  end

  field :allDirectors do
    type types[Types::DirectorType]
    description "A list of all directors"
    resolve ->(obj, args, ctx) { Director.all }
  end

  field :director do
    type Types::DirectorType
    description "Director by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Director.find(args[:id]) }
  end

  field :allFilms, function: Resolvers::FilmsSearch

  field :film do
    type Types::FilmType
    description "Film by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Film.find(args[:id]) }
  end

  field :allMaterialFormats do
    type types[Types::MaterialFormatType]
    description "A list of all material formats"
    resolve ->(obj, args, ctx) { MaterialFormat.all }
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
    resolve ->(obj, args, ctx) { MediaType.all }
  end

  field :media_type do
    type Types::MediaTypeType
    description "Media type by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { MediaType.find(args[:id]) }
  end

  field :allProductionCompanies do
    type types[Types::ProductionCompanyType]
    description "A list of all production companies"
    resolve ->(obj, args, ctx) { ProductionCompany.all }
  end

  field :production_company do
    type Types::ProductionCompanyType
    description "Production company by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { ProductionCompany.find(args[:id]) }
  end

  field :allPublishers do
    type types[Types::PublisherType]
    description "A list of all publishers"
    resolve ->(obj, args, ctx) { Publisher.all }
  end

  field :publisher do
    type Types::PublisherType
    description "Publisher by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Publisher.find(args[:id]) }
  end

  field :allRepositories do
    type types[Types::RepositoryType]
    description "A list of all repositories"
    resolve ->(obj, args, ctx) { Repository.all }
  end

  field :repository do
    type Types::RepositoryType
    description "Repository by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) { Repository.find(args[:id]) }
  end

  field :allWorks, function: Resolvers::WorksSearch

  field :work do
    type Types::WorkType
    description "Work by ID"
    argument :id, !types.ID
    resolve ->(obj, args, ctx) {
      work = Work.find(args[:id])

      # filter out draft entries if user not authenticated
      if work.publication_status === 'draft' && !ctx[:current_user]
        raise ActiveRecord::RecordNotFound
      end

      work
    }
  end
end
