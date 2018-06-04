class Resolvers::CreateProductionCompany < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :contact_info, types.String

  # return type from the mutation
  type Types::ProductionCompanyType

  # the mutation method
  def call(_obj, args, _ctx)
    ProductionCompany.create!(
      name: args[:name],
      contact_info: args[:contact_info],
    )
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
