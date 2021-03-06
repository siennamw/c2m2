Types::RepositoryType = GraphQL::ObjectType.define do
  name 'Repository'

  field :id, !types.ID
  field :name, !types.String
  field :location, !types.String
  field :website, types.String

  field :collections, ( -> { !types[Types::CollectionType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
