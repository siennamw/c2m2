class Resolvers::FetchCountryById < GraphQL::Function
  type Types::CountryType
  description 'Country by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = Country.all
    scope.find(args[:id])
  rescue ActiveRecord::RecordNotFound
    GraphQL::ExecutionError.new('Entry not found')
  end
end
