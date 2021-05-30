class Resolvers::CreateCollection < GraphQL::Function
  # arguments passed as "args"
  argument :id, types.ID
  argument :name, !types.String
  argument :description, types.String
  argument :finding_aid_link, types.String
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

    attributes = {
      name: args[:name],
      finding_aid_link: args[:finding_aid_link],
      description: args[:description],
      repository_id: repository.id,
      id: args[:id],
      created_by: ctx[:current_user],
    }

    record = Collection.create!(attributes)

    if record.persisted?
      Event.create!(
        created_by: record.created_by,
        entity_id: record.id,
        name: 'CreateCollection',
        payload: attributes.filter do |k|
          !%i[id created_by].include?(k)
        end
      )
    end

    # return new record
    record
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
