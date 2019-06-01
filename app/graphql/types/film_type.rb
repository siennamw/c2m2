Types::FilmType = GraphQL::ObjectType.define do
  name 'Film'

  field :id, !types.ID
  field :title, !types.String
  field :secondary_title, types.String
  field :alias_alternates, types.String
  field :imdb_link, types.String

  field :year, !types.Int

  field :country, (-> { Types::CountryType })
  field :media_type, (-> { Types::MediaTypeType })

  field :composers, ( -> { !types[Types::ComposerType] })
  field :directors, ( -> { !types[Types::DirectorType] })
  field :orchestrators, ( -> { !types[Types::ComposerType] })
  field :production_companies, ( -> { !types[Types::ProductionCompanyType] })
  field :works, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
