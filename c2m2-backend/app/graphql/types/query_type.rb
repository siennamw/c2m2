Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :allCountries, types[Types::CountryType] do
    resolve ->(obj, args, ctx) { Country.all }
  end

  field :allMediaTypes, types[Types::MediaTypeType] do
    resolve ->(obj, args, ctx) { MediaType.all }
  end

  field :allMaterialFormats, types[Types::MaterialFormatType] do
    resolve ->(obj, args, ctx) { MaterialFormat.all }
  end

  field :allCatalogers, types[Types::CatalogerType] do
    resolve ->(obj, args, ctx) { Cataloger.all }
  end
end
