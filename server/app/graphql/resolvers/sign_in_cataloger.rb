class Resolvers::SignInCataloger < GraphQL::Function
  argument :email, !Types::AuthProviderEmailInput

  # defines inline return type for the mutation
  type do
    name 'SignInPayload'

    field :token, types.String
    field :cataloger, Types::CatalogerType
  end

  def call(_obj, args, ctx)
    input = args[:email]

    # basic validation
    return unless input

    cataloger = Cataloger.find_by email: input[:email]

    # ensures we have the correct cataloger
    return unless cataloger
    return unless cataloger.authenticate(input[:password])

    # use Ruby on Rails - ActiveSupport::MessageEncryptor, to build a token
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base.byteslice(0..31))
    token = crypt.encrypt_and_sign("cataloger-id:#{ cataloger.id }")

    ctx[:session][:token] = token

    OpenStruct.new({ cataloger: cataloger, token: token })
  end
end
