Types::CollectionType = GraphQL::ObjectType.define do
  name 'Collection'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String

  field :repository, (-> { Types::RepositoryType })
  field :works, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
