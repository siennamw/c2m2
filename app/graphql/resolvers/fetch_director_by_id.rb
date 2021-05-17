class Resolvers::FetchDirectorById < GraphQL::Function
  type Types::DirectorType
  description 'Director by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? Director.all : Director.active
    scope.find(args[:id])
  end
end
