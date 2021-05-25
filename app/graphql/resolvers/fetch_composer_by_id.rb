class Resolvers::FetchComposerById < GraphQL::Function
  type Types::ComposerType
  description 'Composer by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = Composer.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
