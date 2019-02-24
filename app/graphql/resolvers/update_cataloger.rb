class Resolvers::UpdateCataloger < GraphQL::Function
  auth_provider_input = GraphQL::InputObjectType.define do
    name 'AuthProviderUpdateData'

    argument :email, Types::AuthProviderEmailInput
  end

  # arguments passed as "args"
  argument :id, !types.ID

  argument :name, !types.String
  argument :authProvider, !auth_provider_input
  argument :description, types.String

  # return type from the mutation
  type Types::CatalogerType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    cataloger = Cataloger.update(
      args[:id],
      name: args[:name],
      email: args[:authProvider][:email][:email],
      password: args[:authProvider][:email][:password],
      description: args[:description],
      created_by: ctx[:current_user],
    )

    # TODO: implement user info change email
    # Tell the UserMailer to send a user info change email asynchronously
    # UserMailer.info_change_email(cataloger).deliver_later

    # Return cataloger
    cataloger
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
