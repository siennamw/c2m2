Types::MaterialFormatType = GraphQL::ObjectType.define do
  name 'MaterialFormat'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String

  field :works, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })
end
