class Resolvers::GetResetPasswordToken < GraphQL::Function
  # arguments passed as "args"
  argument :email, !types.String

  # return type
  type !types.Boolean

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    cataloger = Cataloger.find_by(email: args[:email])

    if cataloger
      updated_cataloger = cataloger.generate_password_token!
      UserMailer.reset_password_token_email(updated_cataloger, updated_cataloger.reset_password_token).deliver_later
    end

    # return true regardless
    true
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
