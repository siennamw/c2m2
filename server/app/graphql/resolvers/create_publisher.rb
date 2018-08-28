class Resolvers::CreatePublisher < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :contact_info, types.String

  # return type from the mutation
  type Types::PublisherType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    Publisher.create!(
      name: args[:name],
      contact_info: args[:contact_info],
    )

  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
