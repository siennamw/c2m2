Types::CatalogerType = GraphQL::ObjectType.define do
  name 'Cataloger'

  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
  field :description, types.String
end
