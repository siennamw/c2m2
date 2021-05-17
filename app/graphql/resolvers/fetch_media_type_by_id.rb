class Resolvers::FetchMediaTypeById < GraphQL::Function
  type Types::MediaTypeType
  description 'Media Type by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? MediaType.all : MediaType.active
    scope.find(args[:id])
  end
end
