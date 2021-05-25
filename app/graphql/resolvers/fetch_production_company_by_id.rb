class Resolvers::FetchProductionCompanyById < GraphQL::Function
  type Types::ProductionCompanyType
  description 'Production Company by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ProductionCompany.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
