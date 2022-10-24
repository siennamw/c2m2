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

    attributes = {
      name: args[:name],
      email: args[:email],
      description: args[:description],
      admin: !!args[:admin],
      updated_by: ctx[:current_user],
    }

    record = Cataloger.find_by(id: args[:id])

    record.update!(attributes)

    Event.create!(
      created_by: attributes[:updated_by],
      entity_id: args[:id],
      name: "UpdateCatalogerAdmin",
      payload: attributes.filter do |k|
        !%i[updated_by].include?(k)
      end
    )

    # Tell the UserMailer to send a user info change email asynchronously
    UserMailer.info_change_email(record, true).deliver_now

    # Return updated cataloger
    Cataloger.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
