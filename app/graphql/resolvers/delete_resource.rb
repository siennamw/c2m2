class Resolvers::DeleteResource < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  # return type from the mutation
  type types.Boolean

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    resource = Resource.find(args[:id])

    unless resource.deletable
      raise GraphQL::ExecutionError.new('Record has associated works and cannot be deleted')
    end

    resource.destroy!
    true
  end
end
