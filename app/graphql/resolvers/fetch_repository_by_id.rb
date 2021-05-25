class Resolvers::FetchRepositoryById < GraphQL::Function
  type Types::RepositoryType
  description 'Repository by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = Repository.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
