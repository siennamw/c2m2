Types::CollectionType = GraphQL::ObjectType.define do
  name 'Collection'

  field :id, !types.ID
  field :name, !types.String
  field :finding_aid_link, types.String
  field :description, types.String

  field :deletable, types.Boolean # calls object.deletable

  field :repository, (-> { Types::RepositoryType })
  field :resources, ( -> { !types[Types::ResourceType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
