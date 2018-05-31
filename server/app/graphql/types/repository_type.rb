Types::RepositoryType = GraphQL::ObjectType.define do
  name 'Repository'

  field :id, !types.ID
  field :name, !types.String
  field :location, !types.String
  field :website, types.String

  field :collections, ( -> { !types[Types::CollectionType] })
end
