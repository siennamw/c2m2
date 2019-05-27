Types::DirectorType = GraphQL::ObjectType.define do
  name 'Director'

  field :id, !types.ID
  field :name, !types.String
  field :imdb_link, types.String

  field :works, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })
end
