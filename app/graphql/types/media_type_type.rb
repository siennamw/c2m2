Types::MediaTypeType = GraphQL::ObjectType.define do
  name 'MediaType'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String

  field :works, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
