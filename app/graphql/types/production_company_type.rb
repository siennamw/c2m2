Types::ProductionCompanyType = GraphQL::ObjectType.define do
  name 'ProductionCompany'

  field :id, !types.ID
  field :name, !types.String
  field :contact_info, types.String

  field :deletable, types.Boolean # calls object.deletable
  field :deleted, types.Boolean


  field :works, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
