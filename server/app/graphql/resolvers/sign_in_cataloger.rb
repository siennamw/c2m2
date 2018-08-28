class Resolvers::SignInCataloger < GraphQL::Function
  argument :email, !Types::AuthProviderEmailInput

  # defines inline return type for the mutation
  type do
    name 'SignInPayload'

    field :token, types.String
    field :cataloger, Types::CatalogerType
  end

  def call(_obj, args, _ctx)
    input = args[:email]

    # basic validation
    return unless input

    cataloger = Cataloger.find_by(email: input[:email])

    # ensures we have the correct cataloger
    return unless cataloger
    return unless cataloger.authenticate(input[:password])

    OpenStruct.new({
      token: AuthToken.token(cataloger),
      cataloger: cataloger
    })

  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
