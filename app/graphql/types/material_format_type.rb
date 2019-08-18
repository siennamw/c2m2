Types::MaterialFormatType = GraphQL::ObjectType.define do
  name 'MaterialFormat'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String

  field :resources, ( -> { !types[Types::ResourceType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
