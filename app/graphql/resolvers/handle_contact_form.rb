class Resolvers::HandleContactForm < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :email, !types.String
  argument :message, !types.String

  # return type
  type !types.Boolean

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    # Tell the ContactMailer to send a contact email asynchronously
    ContactMailer.contact_email(args[:name], args[:email], args[:message]).deliver_later

    # Return true
    true
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
