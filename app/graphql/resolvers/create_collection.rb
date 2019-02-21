class Resolvers::CreateCollection < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :description, types.String
  argument :repository_id, !types.ID

  # return type from the mutation
  type Types::CollectionType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    repository = Repository.find(args[:repository_id])
    return unless repository

    Collection.create!(
      name: args[:name],
      description: args[:description],
      repository: repository,
      cataloger: ctx[:current_user],
    )

  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
