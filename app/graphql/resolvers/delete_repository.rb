class Resolvers::DeleteRepository < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  # return type from the mutation
  type types.Boolean

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    repository = Repository.find(args[:id])

    unless repository.deletable
      raise GraphQL::ExecutionError.new('Record has associated collections and cannot be deleted')
    end

    repository.destroy!
    true
  end
end
