class Resolvers::HandleSuggestionForm < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :email, !types.String
  argument :composers, types.String
  argument :works, types.String
  argument :link, types.String
  argument :location, types.String
  argument :comments, types.String

  # return type
  type !types.Boolean

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    fields = {
      composers: args[:composers],
      works: args[:works],
      link: args[:link],
      location: args[:location],
      comments: args[:comments]
    }

    # Tell the ContactMailer to send a suggestion email asynchronously
    ContactMailer.suggestion_email(args[:name], args[:email], fields).deliver_later

    # Return true
    true
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
