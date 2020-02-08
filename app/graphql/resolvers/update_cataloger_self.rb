class Resolvers::UpdateCatalogerSelf < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID
  argument :email, !types.String
  argument :name, !types.String
  argument :password, !types.String
  argument :admin, types.Boolean
  argument :description, types.String
  argument :new_password, types.String

  # return type from the mutation
  type Types::CatalogerType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    cataloger = Cataloger.find_by(id: args[:id])

    # only admins and the cataloger concerned can update cataloger entries
    unless cataloger == ctx[:current_user]
      raise GraphQL::ExecutionError.new("You do not have permission to edit account information for this cataloger")
    end

    # re-authenticate for security
    unless cataloger.authenticate(args[:password])
      raise GraphQL::ExecutionError.new("Authentication failed")
    end

    cataloger.update!(
      name: args[:name],
      email: args[:email],
      password: args[:new_password] || args[:password],
      description: args[:description],
      admin: ctx[:current_user].admin ? !!args[:admin] : false,
      updated_by: ctx[:current_user],
    )

    # TODO: implement user info change email
    # Tell the UserMailer to send a user info change email asynchronously
    # UserMailer.info_change_email(cataloger).deliver_later

    # Return updated cataloger
    Cataloger.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
