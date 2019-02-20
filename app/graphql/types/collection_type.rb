Types::CollectionType = GraphQL::ObjectType.define do
  name 'Collection'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String

  field :repository, (-> { Types::RepositoryType })
  field :cataloger, (-> { Types::CatalogerType })

  field :works, ( -> { !types[Types::WorkType] })
end
