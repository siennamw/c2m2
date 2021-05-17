class Resolvers::FetchRepositoryById < GraphQL::Function
  type Types::RepositoryType
  description 'Repository by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? Repository.all : Repository.active
    scope.find(args[:id])
  end
end
