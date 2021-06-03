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

    attributes = {
      name: args[:name],
      description: args[:description],
      updated_by: ctx[:current_user],
    }

    country.update!(attributes)

    Event.create!(
      created_by: attributes[:updated_by],
      entity_id: args[:id],
      name: 'UpdateCountry',
      payload: attributes.filter do |k|
        !%i[updated_by].include?(k)
      end
    )

    Country.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
