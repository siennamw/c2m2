class Resolvers::CreateProductionCompany < GraphQL::Function
  # arguments passed as "args"
  argument :id, types.ID
  argument :name, !types.String
  argument :contact_info, types.String

  # return type from the mutation
  type Types::ProductionCompanyType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    attributes = {
      id: args[:id],
      name: args[:name],
      contact_info: args[:contact_info],
      created_by: ctx[:current_user],
    }

    record = ProductionCompany.create!(attributes)

    if record.persisted?
      Event.create!(
        created_by: record.created_by,
        entity_id: record.id,
        name: 'CreateProductionCompany',
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
