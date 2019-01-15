Types::ComposerType = GraphQL::ObjectType.define do
  name 'Composer'

  field :id, !types.ID
  field :name, !types.String
  field :imdb_link, types.String

  field :works, ( -> { !types[Types::WorkType] })
end
