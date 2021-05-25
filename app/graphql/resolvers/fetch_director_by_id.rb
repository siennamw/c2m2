class Resolvers::FetchDirectorById < GraphQL::Function
  type Types::DirectorType
  description 'Director by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = Director.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
