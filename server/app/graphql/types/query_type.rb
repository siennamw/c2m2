Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :allCatalogers, types[Types::CatalogerType] do
    resolve ->(obj, args, ctx) { Cataloger.all }
  end

  field :allCollections, types[Types::CollectionType] do
    resolve ->(obj, args, ctx) { Collection.all }
  end

  field :allComposers, types[Types::ComposerType] do
    resolve ->(obj, args, ctx) { Composer.all }
  end

  field :allCountries, types[Types::CountryType] do
    resolve ->(obj, args, ctx) { Country.all }
  end

  field :allDirectors, types[Types::DirectorType] do
    resolve ->(obj, args, ctx) { Director.all }
  end

  field :allMaterialFormats, types[Types::MaterialFormatType] do
    resolve ->(obj, args, ctx) { MaterialFormat.all }
  end

  field :allMediaTypes, types[Types::MediaTypeType] do
    resolve ->(obj, args, ctx) { MediaType.all }
  end

  field :allRepositories, types[Types::RepositoryType] do
    resolve ->(obj, args, ctx) { Repository.all }
  end
end
