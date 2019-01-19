Types::ProductionCompanyType = GraphQL::ObjectType.define do
  name 'ProductionCompany'

  field :id, !types.ID
  field :name, !types.String
  field :contact_info, types.String

  field :works, ( -> { !types[Types::WorkType] })
end