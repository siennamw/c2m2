class Resolvers::ResetPassword < GraphQL::Function
  # arguments passed as "args"
  argument :email, !types.String
  argument :reset_token, !types.String
  argument :new_password, !types.String

  # return type
  type !types.Boolean

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    cataloger = Cataloger.find_by(email: args[:email])

    if cataloger
      # check reset_token validity
      token_matches = args[:reset_token] == cataloger.reset_password_token
      token_is_not_expired = Time.now < cataloger.reset_password_token_expires_at

      return false unless token_matches && token_is_not_expired

      cataloger.password = args[:new_password]

      return false unless cataloger.validate

      cataloger.save!
      cataloger.clear_password_token!

      # Return true to signal success
      return true
    end

    false
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
