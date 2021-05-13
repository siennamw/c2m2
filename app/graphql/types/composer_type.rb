Types::ComposerType = GraphQL::ObjectType.define do
  name 'Composer'

  field :id, !types.ID
  field :name, !types.String
  field :imdb_link, types.String

  field :deleted, types.Boolean
  field :deletable, types.Boolean # calls object.deletable

  field :works, ( -> { !types[Types::WorkType] })
  field :works_as_orchestrator, ( -> { !types[Types::WorkType] })

  field :created_by, (-> { Types::CatalogerType })
  field :updated_by, (-> { Types::CatalogerType })

  field :created_at, !types.String
  field :updated_at, !types.String
end
