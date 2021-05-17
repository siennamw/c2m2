class Resolvers::FetchMaterialFormatById < GraphQL::Function
  type Types::MaterialFormatType
  description 'Material Format by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? MaterialFormat.all : MaterialFormat.active
    scope.find(args[:id])
  end
end
