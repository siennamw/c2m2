class Resolvers::DeleteWork < GraphQL::Function
  # arguments passed as "args"
  argument :id, !types.ID

  # return type from the mutation
  type types.Boolean

  # the mutation method
  def call(_obj, args, ctx)
    if ctx[:current_user].blank?
      raise GraphQL::ExecutionError.new('Authentication required')
    end

    work = Work.find(args[:id])

    unless work.deletable
      raise GraphQL::ExecutionError.new('Record has associated resources and cannot be deleted')
    end

    work.destroy!
    true
  end
end
