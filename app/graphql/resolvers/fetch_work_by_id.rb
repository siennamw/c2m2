class Resolvers::FetchWorkById < GraphQL::Function
  type Types::WorkType
  description 'Work by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? Work.all : Work.active
    scope.find(args[:id])
  end
end
