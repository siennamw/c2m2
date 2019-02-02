class Resolvers::CreateCataloger < GraphQL::Function
  auth_provider_input = GraphQL::InputObjectType.define do
    name 'AuthProviderSignupData'

    argument :email, Types::AuthProviderEmailInput
  end

  # arguments passed as "args"
  argument :name, !types.String
  argument :authProvider, !auth_provider_input
  argument :description, types.String

  # return type from the mutation
  type Types::CatalogerType

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    cataloger = Cataloger.create!(
      name: args[:name],
      email: args[:authProvider][:email][:email],
      password: args[:authProvider][:email][:password],
      description: args[:description],
      created_by: ctx[:current_user],
    )

    # Tell the UserMailer to send a welcome email asynchronously
    UserMailer.with(user: cataloger).welcome_email.deliver_later

    # Return cataloger
    cataloger
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
