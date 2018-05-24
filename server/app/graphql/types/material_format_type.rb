Types::MaterialFormatType = GraphQL::ObjectType.define do
  name 'MaterialFormat'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
end
