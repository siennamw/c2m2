class Resolvers::ToggleDeleteComposer < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  # return type from the mutation
  type Types::ComposerType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    composer = Composer.find(args[:id])
    composer.update!(
      deleted: !composer.deleted,
      updated_by: ctx[:current_user],
    )

    Composer.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
