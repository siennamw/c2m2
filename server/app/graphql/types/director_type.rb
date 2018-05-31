Types::DirectorType = GraphQL::ObjectType.define do
  name 'Director'

  field :id, !types.ID
  field :name, !types.String
  field :imdb_link, types.String
end
