class Resolvers::UpdateProductionCompany < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  argument :name, !types.String
  argument :contact_info, types.String

  # return type from the mutation
  type Types::ProductionCompanyType

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    production_company = ProductionCompany.find(args[:id])
    production_company.update!(
      name: args[:name],
      contact_info: args[:contact_info],
      updated_by: ctx[:current_user],
    )

    ProductionCompany.find(args[:id])
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
