class Resolvers::FetchWorkById < GraphQL::Function
  type Types::WorkType
  description 'Work by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = Work.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
