class Resolvers::SignInCataloger < GraphQL::Function
  argument :email, !types.String
  argument :password, !types.String

  # defines inline return type for the mutation
  type do
    name 'SignInPayload'

    field :token, types.String
    field :cataloger, Types::CatalogerType
  end

  def call(_obj, args, _ctx)
    # basic validation
    return unless args[:email] && args[:password]

    cataloger = Cataloger.find_by(email: args[:email])

    # ensures we have the correct cataloger
    return unless cataloger
    return unless cataloger.authenticate(args[:password])

    OpenStruct.new({
      token: AuthToken.token(cataloger),
      cataloger: cataloger
    })

  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
