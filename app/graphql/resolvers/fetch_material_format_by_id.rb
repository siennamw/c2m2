class Resolvers::FetchMaterialFormatById < GraphQL::Function
  type Types::MaterialFormatType
  description 'Material Format by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = MaterialFormat.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
