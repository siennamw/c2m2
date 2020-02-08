class Resolvers::UpdateDirector < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  argument :name, !types.String
  argument :imdb_link, types.String

  # return type from the mutation
  type Types::DirectorType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    director = Director.find(args[:id])
    director.update!(
      name: args[:name],
      imdb_link: args[:imdb_link],
      updated_by: ctx[:current_user],
    )

    Director.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
