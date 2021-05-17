class Resolvers::FetchCatalogerById < GraphQL::Function
  type Types::CatalogerType
  description 'Cataloger by ID'
  argument :id, !types.ID

  def call(_obj, args, _ctx)
    Cataloger.find(args[:id])
  end
end
