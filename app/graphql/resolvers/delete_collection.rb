class Resolvers::DeleteCollection < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  # return type from the mutation
  type types.Boolean

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    collection = Collection.find(args[:id])

    unless collection.deletable
      raise GraphQL::ExecutionError.new('Record has associated resources and cannot be deleted')
    end

    collection.destroy!
    true
  end
end
