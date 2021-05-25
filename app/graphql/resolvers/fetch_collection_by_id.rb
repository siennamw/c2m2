class Resolvers::FetchCollectionById < GraphQL::Function
  type Types::CollectionType
  description 'Collection by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = Collection.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
