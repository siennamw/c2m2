class Resolvers::FetchCollectionById < GraphQL::Function
  type Types::CollectionType
  description 'Collection by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? Collection.all : Collection.active
    scope.find(args[:id])
  end
end
