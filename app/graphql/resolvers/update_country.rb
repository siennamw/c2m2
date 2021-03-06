class Resolvers::UpdateCountry < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  argument :name, !types.String
  argument :description, types.String

  # return type from the mutation
  type Types::CountryType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    country = Country.find(args[:id])
    country.update!(
      name: args[:name],
      description: args[:description],
      updated_by: ctx[:current_user],
    )

    Country.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
