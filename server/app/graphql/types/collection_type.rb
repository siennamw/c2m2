Types::CollectionType = GraphQL::ObjectType.define do
  name 'Collection'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String

  field :repository, (-> { Types::RepositoryType })
end
