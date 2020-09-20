class Resolvers::UpdateCatalogerAdmin < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID
  argument :email, !types.String
  argument :name, !types.String
  argument :admin, types.Boolean
  argument :description, types.String

  # return type from the mutation
  type Types::CatalogerType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    # only admins can use this resolver to update cataloger entries
    # (non-admins can update their own accounts using UpdateCatalogerSelf)
    unless ctx[:current_user].admin
      raise GraphQL::ExecutionError.new("You do not have permission to edit cataloger entries")
    end

    cataloger = Cataloger.find_by(id: args[:id])

    cataloger.update!(
      name: args[:name],
      email: args[:email],
      description: args[:description],
      admin: !!args[:admin],
      updated_by: ctx[:current_user],
    )

    # Tell the UserMailer to send a user info change email asynchronously
    UserMailer.info_change_email(cataloger, true).deliver_later

    # Return updated cataloger
    Cataloger.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
