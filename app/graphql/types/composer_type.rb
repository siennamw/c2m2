Types::ComposerType = GraphQL::ObjectType.define do
  name 'Composer'

  field :id, !types.ID
  field :name, !types.String
  field :imdb_link, types.String

  field :cataloger, (-> { Types::CatalogerType })

  field :works, ( -> { !types[Types::WorkType] })
  field :works_as_orchestrator, ( -> { !types[Types::WorkType] })
end
