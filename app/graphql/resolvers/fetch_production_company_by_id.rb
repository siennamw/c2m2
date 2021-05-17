class Resolvers::FetchProductionCompanyById < GraphQL::Function
  type Types::ProductionCompanyType
  description 'Production Company by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? ProductionCompany.all : ProductionCompany.active
    scope.find(args[:id])
  end
end
