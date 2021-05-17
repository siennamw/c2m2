class Resolvers::FetchCountryById < GraphQL::Function
  type Types::CountryType
  description 'Country by ID'
  argument :id, !types.ID

  def call(_obj, args, ctx)
    scope = ctx[:current_user] ? Country.all : Country.active
    scope.find(args[:id])
  end
end
