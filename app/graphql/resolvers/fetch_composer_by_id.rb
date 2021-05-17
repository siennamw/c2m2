class Resolvers::FetchComposerById < GraphQL::Function
  type Types::ComposerType
  description 'Composer by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? Composer.all : Composer.active
    scope.find(args[:id])
  end
end
