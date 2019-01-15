Types::CountryType = GraphQL::ObjectType.define do
  name 'Country'

  field :id, !types.ID
  field :name, !types.String
  field :description, types.String

  field :works, ( -> { !types[Types::WorkType] })
end
