Types::MediaTypeType = GraphQL::ObjectType.define do
  name 'MediaType'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String
end
