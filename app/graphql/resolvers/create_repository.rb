class Resolvers::CreateRepository < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :location, !types.String
  argument :website, types.String

  # return type from the mutation
  type Types::RepositoryType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    Repository.create!(
      name: args[:name],
      location: args[:location],
      website: args[:website],
      cataloger: ctx[:current_user],
    )

  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
