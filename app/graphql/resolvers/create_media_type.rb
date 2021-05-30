class Resolvers::CreateMediaType < GraphQL::Function
  # arguments passed as "args"
  argument :id, types.ID
  argument :name, !types.String
  argument :description, types.String

  # return type from the mutation
  type Types::MediaTypeType

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    # only admins can create media type entries
    unless ctx[:current_user].admin
      raise GraphQL::ExecutionError.new("You do not have permission to create media type entries")
    end

    attributes = {
      id: args[:id],
      name: args[:name],
      description: args[:description],
      created_by: ctx[:current_user],
    }

    record = MediaType.create!(attributes)

    if record.persisted?
      Event.create!(
        created_by: record.created_by,
        entity_id: record.id,
        name: 'CreateMediaType',
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
