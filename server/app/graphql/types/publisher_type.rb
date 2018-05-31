Types::PublisherType = GraphQL::ObjectType.define do
  name 'Publisher'

  field :id, !types.ID
  field :name, !types.String
  field :contact_info, types.String

  field :works, ( -> { !types[Types::WorkType] })
end
