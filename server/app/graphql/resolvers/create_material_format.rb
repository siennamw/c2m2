class Resolvers::CreateMaterialFormat < GraphQL::Function
  # arguments passed as "args"
  argument :name, !types.String
  argument :description, types.String

  # return type from the mutation
  type Types::MaterialFormatType

  # the mutation method
  # _obj - is parent object, which in this case is nil
  # args - are the arguments passed
  # _ctx - is the GraphQL context
  def call(_obj, args, _ctx)
    MaterialFormat.create!(
      name: args[:name],
      description: args[:description],
    )
  rescue ActiveRecord::RecordInvalid => e
    # this would catch all validation errors and translate them to GraphQL::ExecutionError
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
