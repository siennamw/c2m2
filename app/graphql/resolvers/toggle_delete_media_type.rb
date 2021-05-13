class Resolvers::ToggleDeleteMediaType < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  # return type from the mutation
  type Types::MediaTypeType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    media_type = MediaType.find(args[:id])
    media_type.update!(
      deleted: !media_type.deleted,
      updated_by: ctx[:current_user],
    )

    MediaType.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
