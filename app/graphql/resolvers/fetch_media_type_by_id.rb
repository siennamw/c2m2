class Resolvers::FetchMediaTypeById < GraphQL::Function
  type Types::MediaTypeType
  description 'Media Type by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = MediaType.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
