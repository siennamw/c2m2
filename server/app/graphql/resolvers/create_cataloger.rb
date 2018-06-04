class Resolvers::CreateCataloger < GraphQL::Function
  AuthProviderInput = GraphQL::InputObjectType.define do
    name 'AuthProviderSignupData'

    argument :email, Types::AuthProviderEmailInput
  end

  # arguments passed as "args"
  argument :name, !types.String
  argument :authProvider, !AuthProviderInput
  argument :description, types.String

  # return type from the mutation
  type Types::CatalogerType

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    Cataloger.create!(
      name: args[:name],
      email: args[:authProvider][:email][:email],
      password: args[:authProvider][:email][:password],
      description: args[:description],
    )
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
