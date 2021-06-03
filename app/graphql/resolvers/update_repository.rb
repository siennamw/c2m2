class Resolvers::UpdateRepository < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

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

    repository = Repository.find(args[:id])

    attributes = {
      name: args[:name],
      location: args[:location],
      website: args[:website],
      updated_by: ctx[:current_user],
    }

    repository.update!(attributes)

    Event.create!(
      created_by: attributes[:updated_by],
      entity_id: args[:id],
      name: 'UpdateRepository',
      payload: attributes.filter do |k|
        !%i[updated_by].include?(k)
      end
    )

    Repository.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
