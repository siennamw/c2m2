class Resolvers::CreateComposer < GraphQL::Function
  # arguments passed as "args"
  argument :id, types.ID
  argument :name, !types.String
  argument :imdb_link, types.String

  # return type from the mutation
  type Types::ComposerType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    attributes = {
      id: args[:id],
      name: args[:name],
      imdb_link: args[:imdb_link],
      created_by: ctx[:current_user],
    }

    record = Composer.create!(attributes)

    if record.persisted?
      Event.create!(
        created_by: record.created_by,
        entity_id: record.id,
        name: 'CreateComposer',
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
